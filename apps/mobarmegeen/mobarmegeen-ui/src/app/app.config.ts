import {
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {  provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
       withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
    ),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
  ],
};
