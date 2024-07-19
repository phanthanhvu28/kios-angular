import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { DataFilterUser } from '@pages/user/models';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
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

  menus: any[]=[]
  nodes: any[]=[]

  checkedKeys = []
  
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  searchValue = '';  

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
      console.log("filter",this.filter);
  } 
  
  ngOnChanges(changes: SimpleChange) {
    this.initDataForm();
    this.menus = this.filter !=null ? this.filter.menus : [];
    console.log("menus",this.menus);
    this.mapNodes(this.menus);
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
    const nodes = this.checkedKeys; 
    const payload = {
      ...this.formUser.value     
    }
   
    this.mapMenus(nodes);
    console.log("handleSave",nodes);  
    
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
  mapMenus(nodes:NzTreeNode[]){
    let menus=[]

    nodes.forEach(item => {    
      if(item.level==0)  {
        // const menu = {
        //   apiCode: item.origin.key,
        //   apiName: item.origin.title,
        //   sites: item.children.map(item2 => {
        //     return {
        //       siteCode: item2.key,
        //       siteName: item2.title,
        //       feature: item2.children.map(item3 =>{
        //         return {
        //           featureCode: item3.key,
        //           featureName: item3.title
        //         }
        //       })
        //     }
        //   })
        // }
        // menus.push(menu)
        menus.push(this.mapMenusLevel0(item))
      }    
    })

    console.log("handleSaveMenu=>",menus);   
  }
  mapMenusLevel0(item:NzTreeNode) : any{
    //const menus=[]   
    const menu = {
    
      apiCode: item.origin.key,
      apiName: item.origin.title,
      sites: item.children.map(item2 => {
        return {
          siteCode: item2.key,
          siteName: item2.title,
          feature: item2.children.map(item3 =>{
            return {
              featureCode: item3.key,
              featureName: item3.title
            }
          })
        }
      })
    }
    // menus.push(menu);
    // console.log("mapMenusLevel0=>",menus);   
    return menu;
  }
  mapMenusLevel1(item:NzTreeNode) : any{
    //const menus=[]   
    const menu = {
      apiCode: item.parentNode.origin.key,
      apiName: item.parentNode.origin.title,
      sites: item.children.map(item2 => {
        return {
          siteCode: item2.key,
          siteName: item2.title,
          feature: item2.children.map(item3 =>{
            return {
              featureCode: item3.key,
              featureName: item3.title
            }
          })
        }
      })
    }
    // menus.push(menu);
    // console.log("mapMenusLevel0=>",menus);   
    return menu;
  }
  mapMenusLevel2(item:NzTreeNode) : any{
    //const menus=[]   
    const parent0 = item.parentNode.parentNode.key
    const menu = {
      apiCode: item.parentNode.origin.key,
      apiName: item.parentNode.origin.title,
      sites: item.children.map(item2 => {
        return {
          siteCode: item2.key,
          siteName: item2.title,
          feature: item2.children.map(item3 =>{
            return {
              featureCode: item3.key,
              featureName: item3.title
            }
          })
        }
      })
    }
    // menus.push(menu);
    // console.log("mapMenusLevel0=>",menus);   
    return menu;
  }


  mapNodes(menus:any[]){
    const nodes = menus.map(item=>{     
      return {
        title: item.apiName,
        key : item.apiCode,
        children: item.sites.map(item2=>{
          return {
            title: item2.siteName,
            key : item2.siteCode,
            children: item2.feature.map(item3=>{
              return {
                title: item3.featureName,
                key : item3.featureCode,
                isLeaf: true
              }
            })
          }
        })
      }    
    });
    console.log("mapNodes=>",nodes);  
    this.nodes = nodes;
  }


  nzEvent(event: NzFormatEmitEvent): void {
    this.checkedKeys = event.checkedKeys
    console.log(event.checkedKeys);
   
  } 
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
