import { ItemOptions } from "@models/base-data-list";
import { StatusEnum } from "../enums";

export const LIST_STATUS_COMPANY: Array<ItemOptions> = [
    {
      label: StatusEnum.Active,
      value: StatusEnum.Active
    },
    {
      label: StatusEnum.Approved,
      value: StatusEnum.Approved
    },
    {
      label: StatusEnum.Amending,
      value: StatusEnum.Amending
    },
    {
      label: StatusEnum.Inactive,
      value: StatusEnum.Inactive
    },
  
    {
      label: StatusEnum.New,
      value: StatusEnum.New
    },
  
    {
      label: StatusEnum.Waiting,
      value: StatusEnum.Waiting
    }
  ];
  export const LIST_COMPANY_OPTION: { [key: string]: Array<ItemOptions> } = {
    status: LIST_STATUS_COMPANY
  };