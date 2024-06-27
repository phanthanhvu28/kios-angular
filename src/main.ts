import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
declare global {
  interface Window {
    config: any;
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

  fetch('/assets/config/app-setting.json')
  .then((response) => response.json())
  .then((config: any) => {
    window.config = config;
    platformBrowserDynamic()
      .bootstrapModule(AppModule)      
      .catch((err) => console.error(err));
  });

