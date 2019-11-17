import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  DefaultNotificationConfig,
  NOTIFICATION_CONFIG_TOKEN,
  NotificationAlertContainerStyles,
  NotificationConfig,
  NotificationData
} from './notification-config';
import { NotificationRef } from './notification-ref';
import { BehaviorSubject, defer, interval, Observable, timer } from 'rxjs';
import { filter, map, reduce, share, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {
  show: boolean;
  animatedClass = 'fadeInDown';
  notification: {
    obs: { stepTimer: Observable<any>; completeTimer: Observable<any> };
    paused: BehaviorSubject<boolean>;
  };

  constructor(
    readonly data: NotificationData,
    readonly ref: NotificationRef,
    readonly containerStyles: NotificationAlertContainerStyles,
    @Inject(DefaultNotificationConfig) private notificationConfig: NotificationConfig
  ) {}

  ngOnInit() {
    if (this.notificationConfig.dismissible) {
      this.dismissibleTimer();
    }
    this.show = true;
  }

  close() {
    if (this.notificationConfig.animation) {
      this.animatedClass = 'fadeOutUp';
      this.show = false;
      timer(1000)
        .pipe(take(1))
        .subscribe(t => this.ref.close());
    } else {
      this.show = false;
      this.ref.close();
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver() {
    if (this.notificationConfig.dismissible) {
      this.notification.paused.next(true);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    if (this.notificationConfig.dismissible) {
      this.notification.paused.next(false);
    }
  }

  private dismissibleTimer() {
    const subject = new BehaviorSubject<boolean>(false);
    this.notification = {
      paused: subject,
      obs: this.getPausableTimer(this.notificationConfig.timeOut, subject)
    };
    this.notification.obs.completeTimer.pipe(take(1)).subscribe(t => this.close());
  }

  private getPausableTimer(
    timeout: number,
    pause: BehaviorSubject<boolean>
  ): { stepTimer: Observable<any>; completeTimer: Observable<any> } {
    const pausableTimer$ = defer(() => {
      let seconds = 1;
      return interval(1000).pipe(
        withLatestFrom(pause),
        filter(([v, paused]) => !paused),
        take(timeout),
        map(() => seconds++)
      );
    }).pipe(share());

    return { stepTimer: pausableTimer$, completeTimer: pausableTimer$.pipe(reduce((x, y) => y)) };
  }
}
