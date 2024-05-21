import { EnvironmentCore } from './environment.core';

export class Environment extends EnvironmentCore {
  constructor() {
    super();
    this.local = true;
    this.production = false;
    this.showError = true;
  }
}

export const environment = new Environment();
