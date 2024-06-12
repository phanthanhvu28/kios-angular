import { TemplateRef } from '@angular/core';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';

export interface ModalMessageData {
  key?: string;
  title?: string;
  imageSrc?: string;
  content?: string | TemplateRef<any>;
  hasCloseIcon?: boolean;
  buttons?: ActionBtns[];
  size?: 'default' | 'large' | number;
  type?: 'success' | 'alert' | 'warning' | 'error';
  titleClass?: string;
  contentClass?: string;
  createdAt?: Date;
  messageId?: string;
  options?: NzMessageDataOptions;
  closeAfter?: number;
  isStringContent?: boolean;
  nzMaskClosable?: boolean; // default is false
  footerClass?: string;
  onClose?: () => void;
}

export interface NvConfirmMessageOptions {
  onClickConfirm: () => void;
}

export interface ActionBtns {
  label: string;
  class?: string;
  hasIconTick?: boolean;
  command?: (close: () => void) => void;
}

export declare type NvMessageRef = Required<ModalMessageData>;
