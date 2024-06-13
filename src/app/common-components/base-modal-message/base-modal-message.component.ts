import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from 'ng-zorro-antd/message';
import { ModalMessageData } from './models/typings';
import { takeUntil } from 'rxjs';

const NZ_CONFIG_COMPONENT_NAME = 'message';

const NZ_MESSAGE_DEFAULT_CONFIG: Required<MessageConfig> = {
  nzAnimate: true,
  nzDuration: 3000,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzTop: 24,
  nzDirection: 'ltr'
};

@Component({
  selector: 'app-base-modal-message',
  templateUrl: './base-modal-message.component.html',
  styleUrls: ['./base-modal-message.component.less']
})
export class BaseModalMessageComponent extends NzMNContainerComponent{
  dir: Direction = 'ltr';
  top?: string | null;

  protected componentPrefix: string = 'nv-message-';

  modalInstances: ModalMessageData[] = [];

  constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService) {
    super(cdr, nzConfigService);
  }

  createInstance(data: ModalMessageData): Required<ModalMessageData> {
    if (this.modalInstances.length >= this.config!.nzMaxStack) {
      this.modalInstances = this.modalInstances.slice(1);
    }
    const foundIndex = this.modalInstances.findIndex(
      (instance) => instance.messageId === data.messageId
    );

    if (foundIndex >= 0) {
      return null;
    }

    data.isStringContent = typeof data.content === 'string';
    this.modalInstances = [...this.modalInstances, data];
    this.readyInstances();

    return data as Required<ModalMessageData>;
  }
  
  protected override updateConfig(): void {
    this.config = {
      ...NZ_MESSAGE_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    };

    this.top = toCssPixel(this.config.nzTop);
    this.cdr.markForCheck();
  }
  protected override subscribeConfigChange(): void {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateConfig();
        const config = this.nzConfigService.getConfigForComponent(
          NZ_CONFIG_COMPONENT_NAME
        );
        if (config) {
          const { nzDirection } = config;
          this.dir = nzDirection || this.dir;
        }
      });
  }
  onCloseHandler(messageId: string): void {
    const foundIndex = this.modalInstances.findIndex(
      (instance) => instance.messageId === messageId
    );

    if (foundIndex >= 0) {
      this.modalInstances.splice(foundIndex, 1);
    }
  }

}
