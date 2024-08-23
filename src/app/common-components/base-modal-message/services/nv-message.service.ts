import { Injectable, Injector } from '@angular/core';
import { ModalMessageData, NvConfirmMessageOptions, NvMessageRef } from '../models/typings';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseModalMessageComponent } from '../base-modal-message.component';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MESSAGE_DEFAULTS } from '../consts/messages.conts';

interface SingletonRegistryItem {
  target: NzSafeAny;
}

@Injectable({
  providedIn: 'root'
})
export class NvMessageService {
  protected componentPrefix = 'nv-message-';
  protected container?: BaseModalMessageComponent;

  private _singletonRegistry = new Map<string, SingletonRegistryItem>();
  private get singletonRegistry(): Map<string, SingletonRegistryItem> {
    return this._singletonRegistry;
  }

  constructor(private overlay: Overlay,
    private injector: Injector) { }

  private createInstance(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    this.container = this.withContainer(BaseModalMessageComponent);

    return this.container.createInstance({
      ...modalData,
      createdAt: new Date(),
      messageId: this.getInstanceId(modalData.key),
      options
    });
  }
  private withContainer(
    ctor: ComponentType<BaseModalMessageComponent>
  ): BaseModalMessageComponent {
    let containerInstance = this.getSingletonWithKey(this.componentPrefix);

    if (containerInstance) {
      return containerInstance as BaseModalMessageComponent;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(ctor, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010';

    if (!containerInstance) {
      this.container = containerInstance = componentRef.instance;
      this.registerSingletonWithKey(this.componentPrefix, containerInstance);
    }

    return containerInstance as BaseModalMessageComponent;
  }
  private getInstanceId(key: string): string {
    const messageSuffix: string = key || 'unit';
    return `${this.componentPrefix}-${messageSuffix}`;
  }
  private getSingletonWithKey<T>(key: string): T | null {
    return this.singletonRegistry.has(key)
      ? (this.singletonRegistry.get(key)!.target as T)
      : null;
  }

  private withNewTarget(target: NzSafeAny): SingletonRegistryItem {
    return {
      target
    };
  }
  private registerSingletonWithKey(key: string, target: NzSafeAny): void {
    const alreadyHave = this.singletonRegistry.has(key);
    const item: SingletonRegistryItem = alreadyHave
      ? this.singletonRegistry.get(key)!
      : this.withNewTarget(target);

    if (!alreadyHave) {
      this.singletonRegistry.set(key, item);
    }
  }

  showMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    return this.createInstance(modalData, options);
  }

  showErrorMessage( 
    modalData: ModalMessageData,
    options?: NzMessageDataOptions):NvMessageRef{
      const { title, content, buttons, ...rest } = modalData;
      const defaultErrorModal: ModalMessageData = {
      key: 'error',
      title: title || MESSAGE_DEFAULTS.ERROR.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR.CONTENT,
      buttons: buttons || [{ label: 'Close' }],
      type: 'error',
      ...rest
    };
      return this.createInstance(defaultErrorModal, options);
  }
  showAlertMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'alert',
      title: title || MESSAGE_DEFAULTS.ALERT.TITLE,
      content: content || MESSAGE_DEFAULTS.ALERT.CONTENT,
      buttons: buttons || [{ label: 'Close' }],
      type: 'alert',
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
  showConfirmMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions & NvConfirmMessageOptions
  ): NvMessageRef {
    const { title, content, buttons, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'confirm',
      title: title || MESSAGE_DEFAULTS.CONFIRM.TITLE,
      content: content || MESSAGE_DEFAULTS.CONFIRM.CONTENT,
      buttons: buttons || [
        { label: 'No', class: 'base-button--text base-button--space' },
        {
          label: 'Yes',
          class: 'base-button--primary base-button--space',
          command: (close) => {
            close();
            options?.onClickConfirm();
          },
          hasIconTick: true
        }
      ],
      type: 'success',
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
  showForbiddenMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, imageSrc, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'error403',
      title: title || MESSAGE_DEFAULTS.ERROR_403.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR_403.CONTENT,
      imageSrc: imageSrc || 'assets/images/background/403.png',
      buttons: buttons || [{ label: 'Close' }],
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
  showNoDataMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, imageSrc, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'error404',
      title: title || MESSAGE_DEFAULTS.ERROR_NO_DATA.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR_NO_DATA.CONTENT,
      imageSrc: imageSrc || 'assets/images/message-images/no-data.svg',
      buttons: buttons || [{ label: 'Close' }],
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
  showPageNotFoundMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, imageSrc, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'error404',
      title: title || MESSAGE_DEFAULTS.ERROR_PAGE_NOT_FOUND.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR_PAGE_NOT_FOUND.CONTENT,
      imageSrc: imageSrc || 'assets/images/message-images/page-not-found.svg',
      buttons: buttons || [{ label: 'Close' }],
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
  showNoResultFoundMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, imageSrc, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'error404',
      title: title || MESSAGE_DEFAULTS.ERROR_NO_RESULT_FOUND.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR_NO_RESULT_FOUND.CONTENT,
      imageSrc: imageSrc || 'assets/images/message-images/no-result-found.svg',
      buttons: buttons || [{ label: 'Close' }],
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }

  showErrorServerMessage(
    modalData: ModalMessageData,
    options?: NzMessageDataOptions
  ): NvMessageRef {
    const { title, content, buttons, imageSrc, ...rest } = modalData;
    const defaultErrorModal: ModalMessageData = {
      key: 'error500',
      title: title || MESSAGE_DEFAULTS.ERROR_500.TITLE,
      content: content || MESSAGE_DEFAULTS.ERROR_500.CONTENT,
      imageSrc: imageSrc || 'assets/images/message-images/500.svg',
      buttons: buttons || [{ label: 'Close' }],
      ...rest
    };
    return this.createInstance(defaultErrorModal, options);
  }
}
