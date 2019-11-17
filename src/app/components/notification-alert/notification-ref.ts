import { OverlayRef } from '@angular/cdk/overlay';
import { NotificationAlertService } from './notification-alert.service';

export class NotificationRef {
  constructor(private readonly overlay: OverlayRef, private nt?: NotificationAlertService) {}

  close() {
    this.overlay.dispose();
    this.clearMessage();
  }

  isVisible() {
    return this.overlay && this.overlay.overlayElement;
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect();
  }

  private clearMessage() {
    this.nt.lastMessage = null;
  }
}
