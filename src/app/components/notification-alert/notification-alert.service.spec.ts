import { TestBed } from '@angular/core/testing';

import { NotificationAlertService } from './notification-alert.service';

describe('NotificationAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationAlertService = TestBed.get(NotificationAlertService);
    expect(service).toBeTruthy();
  });
});
