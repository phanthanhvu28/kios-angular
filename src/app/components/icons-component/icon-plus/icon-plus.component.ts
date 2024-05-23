import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-plus',
  templateUrl: './icon-plus.component.html',
  styleUrls: ['./icon-plus.component.less']
})
export class IconPlusComponent {
  @Input() rounded: string | boolean;
  @Input() opacity: number = 1;
  @Input() nvWidth: number = 16;
  @Input() nvHeight: number = 16;
}
