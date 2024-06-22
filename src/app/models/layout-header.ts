export interface DropdownListModel {
    key?: string;
    title?: string;
    iconSrc?: string;
    command?: () => void;
  }
  export interface BreadcrumbData {
    title: string;
    items: Array<Breadcrumb>;
  }
  export interface Breadcrumb {
    label: string;
    url?: string;
    id?: string;
    paramLabels?: { [key: string]: any };
    queryParams?: { [key: string]: any };
  }
  
  export interface RouteDataModel {
    title?: string;
    replaceLbl?: string; // This value will replace the last path text
    items?: Array<Breadcrumb>;
    paramLabels?: { [key: string]: any };
    queryParams?: { [key: string]: any };
    displayBreadscrumb?: boolean;
  }
  