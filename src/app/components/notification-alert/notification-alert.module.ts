import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  defaultNotificationCofigValues,
  DefaultNotificationConfig,
  NotificationConfig
} from './notification-config';
import { OverlayModule } from '@angular/cdk/overlay';
import { NotificationAlertComponent } from './notification-alert.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [NotificationAlertComponent],
  entryComponents: [NotificationAlertComponent]
})
export class NotificationAlertModule {
  public static forRoot(config?: NotificationConfig): ModuleWithProviders {
    return {
      ngModule: NotificationAlertModule,
      providers: [
        {
          provide: DefaultNotificationConfig,
          useValue: config ? config : defaultNotificationCofigValues
        }
      ]
    };
  }
}
