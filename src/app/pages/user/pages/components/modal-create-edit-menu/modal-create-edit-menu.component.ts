import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { DataFilterUser } from '@pages/user/models';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Subject } from 'rxjs';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-menu',
  templateUrl: './modal-create-edit-menu.component.html',
  styleUrls: ['./modal-create-edit-menu.component.less']
})
export class ModalCreateEditMenuComponent implements OnDestroy{
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  private _destroy$ = new Subject<void>();
  @Input() filter: DataFilterUser;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter();
  @Output() handelSubmit = new EventEmitter();

  formUser: FormGroup;
  disableControl:boolean = false;

  storeList: Array<DropdownValue> = [];
  @Input() id: string = null;
  @Input() dataDetail: UserDto;


  private _isVisible: boolean = false;
  @Input() get isVisible(): boolean {
    return this._isVisible;
  }
  set isVisible(newState: boolean) {
    console.log("set isVisible = ", newState)
    this._isVisible = newState;    
  }

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {    
      this.initForm();
      
  } 
  
  ngOnChanges(changes: SimpleChange) {
    this.initDataForm();
  } 
  private initForm(): void {
    this.formUser = this.fb.group({
      username:['',NvValidators.required],
      fullname:['',NvValidators.required],     
      address: [''],
      email:[''],
      phone:[''],
      storecode:[''],
      store:[],
      menus:[],
      searchValue:['']
    });       
  }
  onVisibleModal(value): void {    
    this.isVisible = value   
    this.isVisibleChange.emit(value);
    console.log("onVisibleModal",value)    
  }
  handleCancelModal(): void {
    this.onVisibleModal(false);
    this.onCancel.emit();
  }
  handleSave(): void {      
    const node = this.defaultCheckedKeys; 
    const payload = {
      ...this.formUser.value     
    }
    
    console.log("handleSave",payload);    
  }
  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    this.disableControl == (this.dataDetail != null ? true: false);
    if(this.dataDetail !=null){
      this.formUser.patchValue({     
        username: this.dataDetail.username,
        fullname: this.dataDetail.fullname,
      
      });
    }
  }

  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  searchValue = '';
  nodes = [
    {
      title: '0-0',
      key: '0-0',
      // expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0',
               children:[
                  {title: '1-1-1-1', key: '1-1-1-1', isLeaf: true,}
            ] },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    //this.getSelectedNodes();
  }
  checkedKeys = [];
  getSelectedNodes(): void {
    console.log('Selected nodes: ', this.defaultCheckedKeys);
    const selectedNodes = this.getNodesByKeys(this.checkedKeys, this.nodes);
    console.log('Selected nodes: ', selectedNodes);
  }

  getNodesByKeys(keys: string[], nodes: any[]): any[] {
    const selectedNodes = [];
    const traverse = (nodeList: any[]) => {
      nodeList.forEach(node => {
        if (keys.includes(node.key)) {
          selectedNodes.push(node);
        }
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(nodes);
    return selectedNodes;
  }

}
