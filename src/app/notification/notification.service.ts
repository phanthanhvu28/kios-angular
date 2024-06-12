import { Injectable } from '@angular/core';
import {
  NzNotificationDataOptions,
  NzNotificationRef,
  NzNotificationService
} from 'ng-zorro-antd/notification';

export const VC_NOTIFICATION_DEFAULT_OPTIONS: NzNotificationDataOptions = {
  nzDuration: 3000,
  nzStyle: {
    width: '400px'
  }
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  nzNotification: NzNotificationService;
  constructor(private _notification: NzNotificationService) {
    this.nzNotification = _notification;
  }

  success(
    title = 'Success',
    content: string = '',
    options: NzNotificationDataOptions = {}
  ): NzNotificationRef {
    return this._notification.create('success', title, content, {
      ...VC_NOTIFICATION_DEFAULT_OPTIONS,
      ...{ nzClass: 'vc-notification-notice vc-notification-notice--success' },
      ...options
    });
  }

  info(
    title = 'Info',
    content: string = '',
    options: NzNotificationDataOptions = {}
  ): NzNotificationRef {
    return this._notification.create('info', title, content, {
      ...VC_NOTIFICATION_DEFAULT_OPTIONS,
      ...{ nzClass: 'vc-notification-notice vc-notification-notice--info' },
      ...options
    });
  }

  warning(
    title = 'Warning',
    content: string = '',
    options: NzNotificationDataOptions = {}
  ): NzNotificationRef {
    return this._notification.create('warning', title, content, {
      ...VC_NOTIFICATION_DEFAULT_OPTIONS,
      ...{ nzClass: 'vc-notification-notice vc-notification-notice--warning' },
      ...options
    });
  }

  error(
    title = 'Error',
    content: string = '',
    options: NzNotificationDataOptions = {}
  ): NzNotificationRef {
    return this._notification.create('error', title, content, {
      ...VC_NOTIFICATION_DEFAULT_OPTIONS,
      ...{ nzClass: 'vc-notification-notice vc-notification-notice--error' },
      ...options
    });
  }
}
