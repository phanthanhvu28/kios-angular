import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// import { AuthService } from '@pages/auth';
// import { VcPermission } from '@shared/enums';

export type Permission =
  | boolean
  | string
  | string[]
  // | VcPermission
  // | VcPermission[];

@Directive({
  selector: '[hasPermission]',
  exportAs: 'nvHasPermission'
})
export class NvHasPermission {
  @Input('hasPermission') permission: Permission;
  @Input('hasPermissionExactly') exactly: boolean;

  constructor(
   // private _authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  ngOnInit(): void {
    // if (this._authService.checkPermission(this.permission, !!this.exactly)) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainer.clear();
    // }

    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
