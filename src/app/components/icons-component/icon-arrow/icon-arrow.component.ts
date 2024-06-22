import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-arrow',
  templateUrl: './icon-arrow.component.html',
  styleUrls: ['./icon-arrow.component.less']
})
export class IconArrowComponent {
  @Input() direction: 'up' | 'right' | 'down' | 'left' = 'left';
}
