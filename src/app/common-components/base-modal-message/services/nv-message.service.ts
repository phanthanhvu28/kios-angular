import { Injectable } from '@angular/core';
import { ModalMessageData, NvMessageRef } from '../models/typings';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class NvMessageService {

  constructor() { }

  showErrorMessage( 
    modalData: ModalMessageData,
    options?: NzMessageDataOptions){

  }
}
