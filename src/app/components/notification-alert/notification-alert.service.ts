import { Inject, Injectable, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NotificationRef } from './notification-ref';
import {
  DefaultNotificationConfig,
  NotificationAlertContainerStyles,
  NotificationConfig,
  NotificationData
} from './notification-config';
import { NotificationAlertComponent } from './notification-alert.component';

const Styles: NotificationAlertContainerStyles = {
  display: 'inline-block',
  margin: '0px auto',
  position: 'fixed',
  transition: 'all 0.5s ease-in-out',
  zIndex: '1031'
};

@Injectable({
  providedIn: 'root'
})
export class NotificationAlertService {
  private lastNotification: NotificationRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(DefaultNotificationConfig) private notificationConfig: NotificationConfig
  ) {}

  // tslint:disable-next-line:variable-name
  private _lastMessage: string | string[];

  set lastMessage(value: string | string[]) {
    this._lastMessage = value;
  }

  show(data: NotificationData, config?: NotificationConfig) {
    if (
      (Array.isArray(this._lastMessage) && (this._lastMessage || []).includes(data.message)) ||
      this._lastMessage !== data.message
    ) {
      this._lastMessage = data.message;
      const positionStrategy = this.getPositionStrategy();
      const overlayRef = this.overlay.create({ positionStrategy });
      const notificationRef = new NotificationRef(
        overlayRef,
        this.parentInjector.get(NotificationAlertService)
      );

      const injector = this.getInjector(
        data,
        notificationRef,
        this.parentInjector,
        config,
        this.createContainerStyles()
      );
      this.lastNotification = notificationRef;
      const toastPortal = new ComponentPortal(NotificationAlertComponent, null, injector);

      overlayRef.attach(toastPortal);

      return notificationRef;
    }
    return null;
  }

  getPositionStrategy() {
    return this.overlay.position().global();
  }

  getInjector(
    data: NotificationData,
    notificationRef: NotificationRef,
    parentInjector: Injector,
    notificationConfig?: NotificationConfig,
    containerStyles?: NotificationAlertContainerStyles
  ) {
    const tokens = new WeakMap();

    tokens.set(NotificationData, data);
    tokens.set(NotificationRef, notificationRef);
    if (notificationConfig) {
      notificationConfig = { ...this.notificationConfig, ...notificationConfig };
      tokens.set(DefaultNotificationConfig, notificationConfig);
    }

    if (containerStyles) {
      tokens.set(NotificationAlertContainerStyles, containerStyles);
    }
    return new PortalInjector(parentInjector, tokens);
  }

  private createContainerStyles() {
    const styles = { ...Styles };
    let notificationContainer: HTMLDivElement;
    if (this.lastNotification) {
      const element = this.lastNotification.isVisible();
      notificationContainer = element ? element.querySelector('.notification-container') : null;
    }
    if (this.notificationConfig.position && this.notificationConfig.position.includes('top')) {
      styles.top =
        notificationContainer && notificationContainer.style.top
          ? `${parseFloat(notificationContainer.style.top) + notificationContainer.clientHeight}px`
          : '20px';
      switch (this.notificationConfig.position) {
        case 'topLeft':
          styles.left = '20px';
          break;
        case 'topCenter':
          styles.left = '0px';
          styles.right = '0px';
          break;
        case 'topRight':
          styles.right = '20px';
          break;
        default:
          break;
      }
    } else {
      styles.bottom =
        notificationContainer && notificationContainer.style.bottom
          ? `${parseFloat(notificationContainer.style.bottom) + notificationContainer.clientHeight}px`
          : '20px';
      switch (this.notificationConfig.position) {
        case 'bottomLeft':
          styles.left = '20px';
          break;
        case 'bottomCenter':
          styles.left = '0px';
          styles.right = '0px';
          break;
        case 'bottomRight':
          styles.right = '20px';
          break;
        default:
          break;
      }
    }

    return styles;
  }
}
