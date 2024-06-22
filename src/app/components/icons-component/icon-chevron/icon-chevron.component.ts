import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-chevron',
  templateUrl: './icon-chevron.component.html',
  styleUrls: ['./icon-chevron.component.less']
})
export class IconChevronComponent {
  @Input() direction: 'up' | 'right' | 'down' | 'left' = 'down';
  @Input() nvWidth: number = 16;
  @Input() nvHeight: number = 16;
}
