import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { ChildChild, DataFilterUser, NodeChild, NodeParent } from '@pages/user/models';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { Subject, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-menu',
  templateUrl: './modal-create-edit-menu.component.html',
  styleUrls: ['./modal-create-edit-menu.component.less']
})
export class ModalCreateEditMenuComponent  extends AbsBaseModalComponent{
 
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
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
      super();
      this.init();
      console.log("filter",this.filter);
  } 
  protected override initShow(args?: any): void {
    this.initForm();
  }
  ngOnChanges(changes: SimpleChange) {    
    this.initDataForm();
    this.disableControl == (this.dataDetail != null ? true: false);
    this.menus = this.filter !=null ? this.filter.menus : [];
    //this.checkedKeys = []
    console.log("menus",this.menus);
    console.log("DetailMenu",this.dataDetail != null ? this.dataDetail.menus : []);
    this.mapNodes(this.menus,this.dataDetail != null ? this.dataDetail.menus : []);
    // console.log("getTreeNodes",
    //   this.nzTreeComponent.getTreeNodes(),     
    // );
    // console.log("getCheckedNodeList",     
    //   this.nzTreeComponent.getCheckedNodeList(),     
    // );
    // console.log("getSelectedNodeList",         
    //   this.nzTreeComponent.getSelectedNodeList(),
     
    // );
    // console.log("getExpandedNodeList",         
    //   this.nzTreeComponent.getExpandedNodeList()
    // );
  } 
  private init(): void {
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
    this.userService.createUse$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        if (res.isError) {
          return;
        }

        this.close();
        this.handelSubmit.emit(true);
      });
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
    this.close(); 
    // this.isVisible = value   
    // this.isVisibleChange.emit(value);
    // console.log("onVisibleModal",value)    
  }
  handleCancelModal(): void {
    this.close();
    // this.onVisibleModal(false);
    // this.onCancel.emit();
  }
  handleSave(): void {      
    const nodes = this.checkedKeys; 
    const payload = {
      ...this.formUser.value,
      menus: this.mapMenus(nodes)
    }  
    if(this.dataDetail?.username){
      this.userService.updateMenu(payload);
    }   
    console.log("NodesSelected=>",nodes);

    

  }
  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    //this.disableControl == (this.dataDetail != null ? true: false);
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
       return menus.push(this.mapMenusLevel0(item))
      }   
      if(item.level==1)  {
        return menus.push(this.mapMenusLevel1(item))
      }  
      if(item.level==2)  {
        return menus.push(this.mapMenusLevel2(item))
      }  
      return menus;
    })
    console.log("handleSaveMenu=>",menus);  

    const result = menus.reduce((acc, api) => {
      // Kiểm tra nếu apiCode đã tồn tại trong acc, nếu không thì khởi tạo
      let apiEntry = acc.find(entry => entry.apiCode === api.apiCode);
      if (!apiEntry) {
          apiEntry = {
              apiCode: api.apiCode,
              apiName: api.apiName,
              sites: []
          };
          acc.push(apiEntry);
      }
  
      api.sites.forEach(site => {
          // Kiểm tra nếu siteCode đã tồn tại trong apiEntry.sites, nếu không thì khởi tạo
          let siteEntry = apiEntry.sites.find(entry => entry.siteCode === site.siteCode);
          if (!siteEntry) {
              siteEntry = {
                  siteCode: site.siteCode,
                  siteName: site.siteName,
                  feature: []
              };
              apiEntry.sites.push(siteEntry);
          }           
          // Thêm các tính năng của site hiện tại vào siteEntry.feature nếu chúng chưa tồn tại
        site.feature.forEach(f => {
          if (!siteEntry.feature.find(existingFeature => existingFeature.featureCode === f.featureCode)) {
              siteEntry.feature.push(f);
          }
        });
      });  
      return acc;
    }, []);    
    console.log("handleSaveMenusReduce=>",result);   
    return result;
  }
  mapMenusLevel0(item:NzTreeNode) : any{
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
    return menu;
  }
  mapMenusLevel1(item:NzTreeNode) : any{
    const menu = {
      apiCode: item.parentNode.origin.key,
      apiName: item.parentNode.origin.title,
      sites: item.parentNode.origin.children.filter(d=>d.checked).map(item2 => {       
          return {
            siteCode: item2.key,
            siteName: item2.title,
            feature: item2.children.filter(d=>d.checked).map(item3 =>{
              return {
                featureCode: item3.key,
                featureName: item3.title
              }
            })
          }         
      })
    }  
    return menu;
  }
  mapMenusLevel2(item:NzTreeNode) : any{
    const parent2 = item.parentNode.parentNode.origin
    const isHasFeature = parent2.children.some(d=>d.checked)
    const menu = {
      apiCode: parent2.key,
      apiName: parent2.title,
      sites:isHasFeature ? parent2.children.map(item2 => {
        return {
          siteCode: item2.key,
          siteName: item2.title,
          feature: item2.children.filter(d=>d.checked).map(item3 =>{
            return {
              featureCode: item3.key,
              featureName: item3.title
            }
          })
        }
      }):[]
    }  
    return menu;
  }
  // Function to map the children array to the NodeChild structure
  mapToNodeChild(data: any[]): NodeChild[] {
    return data.map(item => ({
        title: item.siteName,
        key: item.siteCode,
        expanded: true,
        children: this.mapToChildChild(item.feature)
    }));
  }

  // Function to map the leaf children array to the ChildChild structure
  mapToChildChild(data: any[]): ChildChild[] {
    return data.map(item => ({
        title: item.featureName,
        key: item.featureCode,
        isLeaf: true
    }));
  }

  mapNodes(menus: any[], selected:any[]){   
    const nodes = menus.map(item => ({
      title: item.apiName,
      key: item.apiCode,
      expanded: true,
      children: this.mapToNodeChild(item.sites)
    }));    
    this.nodes = this.checkNodesInArray2(selected,nodes);
    console.log("mapNodes=>",this.nodes);  
    console.log("mapNodesArray1",selected)
    console.log("mapNodesArray2",nodes)
  }

  
  nzEvent(event: NzFormatEmitEvent): void {
    this.checkedKeys = event.checkedKeys
    console.log("nzEvent==>",event.checkedKeys);   
    console.log("nzEventSelectedKeys==>",event.selectedKeys);   
  }   
  public checkItems(event: NzFormatEmitEvent): void {
    const keys = event.keys;
    const nodes = event.nodes;
    nodes.forEach((item) => {
      if (item.origin.parentId === 0) {
        this.defaultSelectedKeys.push(item.key);
        this.nodes.forEach((arr) => {
          if (arr.key === item.key) {
            arr.children.forEach((key) => {
              this.defaultSelectedKeys.push(key.key);
            });
          }
        });
      } else {
        this.defaultSelectedKeys.push(item.key);
      }
    });
    console.log("checkItems===>",this.defaultSelectedKeys)
  }

  checkNodesInArray2 = (array1, array2) => {
    const findMatchingApi = (api1, api2) => api1.apiCode === api2.key;
    const findMatchingSite = (site1, site2) => site1.siteCode === site2.key;
    const findMatchingFeature = (feature1, feature2) => feature1.featureCode === feature2.key;
    
    return array2.map(api2 => {
        const matchingApi = array1.find(api1 => findMatchingApi(api1, api2));
        
        if (!matchingApi) {
            return api2;
        }

        const sites = api2.children.map(site2 => {
            const matchingSite = matchingApi.sites.find(site1 => findMatchingSite(site1, site2));
            
            if (!matchingSite) {
                return site2;
            }

            const features = site2.children.map(feature2 => ({
                ...feature2,
                checked: matchingSite.feature.some(feature1 => findMatchingFeature(feature1, feature2))
            }));

            const allFeaturesChecked = features.every(feature => feature.checked);

            return { ...site2, children: features, checked: allFeaturesChecked };
        });

        const allSitesChecked = sites.every(site => site.checked);

        return { ...api2, children: sites, checked: allSitesChecked };
    });
  };

}
