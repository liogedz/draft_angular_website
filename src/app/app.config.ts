import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { environment } from '@common/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NgHcaptchaModule.forRoot({
        siteKey: environment.hcaptchaSiteKey,
        languageCode: 'en',
      }),
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
