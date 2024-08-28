import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { take, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.less']
})
export class ListTableComponent{

  cards = Array.from({ length: 1 }, (_, i) => ({ id: i + 1 }));
  
  constructor(
    el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private nvMessageService: NvMessageService,
  ) 
  {
   
  }
  onCardClick(card: any) {
    console.log('Card clicked:', card);
    // Handle the click event, e.g., navigate, open a modal, etc.
  }
 
  onActionClick(event: MouseEvent, action: any) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the card
    console.log('Action clicked:', action);
    // Handle the action button click event
  }
}
