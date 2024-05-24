import { Component, Input } from '@angular/core';
import { StatusClassEnumCompany } from '../../enums/company-status-class.enum';

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.less']
})
export class StatusLabelComponent {
  @Input() data: string = '';
  @Input() isShowArrow: boolean = false;
  classStatus = StatusClassEnumCompany;
}
