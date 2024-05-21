declare const window: any;

export class EnvironmentProperty {
  local: boolean;
  production: boolean;

  showError: boolean;

  MODULE_AVAILABLE: EnvironmentModuleAvailableProperty;

  API_URL: EnvironmentApiProperty;
  CLIENT_ROOT: string;
  CLIENT_ID: string;
  IDP_AUTHORITY: string;

  constructor() {
    this.API_URL = new EnvironmentApiProperty();
  }
}

export class EnvironmentModuleAvailableProperty {
  MASTER_DATA: boolean;

  PARTNER: boolean;
  PARTNER_CUSTOMER: boolean;
  PARTNER_SUPPLIER: boolean;

  COSTING: boolean;
  COSTING_REQUEST_COST: boolean;
  COSTING_LIST: boolean;
  COSTING_CENTER: boolean;

  RFI: boolean;
  RFI_CUSTOMER: boolean;
  RFI_SUPPLIER: boolean;

  PRICE_MANAGEMENT: boolean;
  PRICE_MANAGEMENT_TARIFF: boolean;
  PRICE_MANAGEMENT_PRICING: boolean;
  PRICE_MANAGEMENT_MARKET: boolean;
  PRICE_MANAGEMENT_PROMOTION: boolean;

  QUOTATION: boolean;
  QUOTATION_PNL: boolean;
  QUOTATION_LIST: boolean;

  CONTRACT: boolean;
  CONTRACT_CUSTOMER: boolean;
  CONTRACT_SUPPLIER: boolean;

  BOOKING: boolean;

  OPERATION_EXCELLENCE: boolean;
  OPERATION_EXCELLENCE_SHIPMENT: boolean;
  OPERATION_EXCELLENCE_EXCEPTION: boolean;
  OPERATION_EXCELLENCE_INVENTORY: boolean;
  OPERATION_EXCELLENCE_DOCUMENT: boolean;
  OPERATION_EXCELLENCE_CONFIGURATION: boolean;

  FINANCE_MANAGEMENT: boolean;
  FINANCE_MANAGEMENT_CUSTOMER: boolean;
  FINANCE_MANAGEMENT_CUSTOMER_DEBIT_NOTE: boolean;
  FINANCE_MANAGEMENT_CUSTOMER_SOA: boolean;
  FINANCE_MANAGEMENT_SUPPLIER: boolean;

  SETTING: boolean;
  SETTING_FINANCE: boolean;
  SETTING_FINANCE_EXCHANGE_RATE: boolean;
  SETTING_FINANCE_VAT: boolean;
  SETTING_FINANCE_BANK_ACCOUNT: boolean;

  REPORT: boolean;

  KPI: boolean;

  SUPPORT: boolean;

  AUTHORIZATION: boolean;
  DOC: boolean;
  KIOS: boolean;
}

export class EnvironmentApiProperty {
  MASTER_DATA: EnvironmentApiGatewayProperty;
  COSTING: EnvironmentApiGatewayProperty;
  RFI: EnvironmentApiGatewayProperty;
  BOOKING: EnvironmentApiGatewayProperty;
  TARIFF: EnvironmentApiGatewayProperty;
  SHIPMENT: EnvironmentApiGatewayProperty;
  BILLING: EnvironmentApiGatewayProperty;
  CONTRACT: EnvironmentApiGatewayProperty;
  CONTRACT_CUSTOMER: EnvironmentApiGatewayProperty;
  CONTRACT_SUPPLIER: EnvironmentApiGatewayProperty;
  PNL: EnvironmentApiGatewayProperty;
  QUOTATION: EnvironmentApiGatewayProperty;
  PARTNER: EnvironmentApiGatewayProperty;
  SETTING: EnvironmentApiGatewayProperty;
  KIOS: EnvironmentApiGatewayProperty;
}

export class EnvironmentApiGatewayProperty {
  BASE_URL: string;
  PREFIX: string;
  VERSION: string | null;
}

export class EnvironmentCore extends EnvironmentProperty {
  constructor() {
    super();
  }

  get config(): EnvironmentProperty {
    return window.config || this;
  }

  get baseUrl(): string {
    return this.config.API_URL.MASTER_DATA.BASE_URL;
  }

  get clientId(): string {
    return this.config.CLIENT_ID;
  }

  get idpAuthority(): string {
    return this.config.IDP_AUTHORITY;
  }

  get clientRoot(): string {
    return this.config.CLIENT_ROOT;
  }

  get baseUrlCosting(): string {
    return this.config.API_URL.COSTING.BASE_URL;
  }

  get baseUrlRFI(): string {
    return this.config.API_URL.RFI.BASE_URL;
  }

  get baseUrlPNL(): string {
    return this.config.API_URL.PNL.BASE_URL;
  }

  get baseUrlQuotation(): string {
    return this.config.API_URL.QUOTATION.BASE_URL;
  }

  get baseUrlTariff(): string {
    return this.config.API_URL.TARIFF.BASE_URL;
  }
  get baseUrlKios(): string {
    return this.config.API_URL.KIOS.BASE_URL;
  }
}
