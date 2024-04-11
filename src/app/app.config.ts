import { ApplicationConfig, forwardRef, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyCV1Q4vRRK7SZEcAfdJP6AlWO6NqquVbak",
  authDomain: "walkinportal-fe11c.firebaseapp.com",
  projectId: "walkinportal-fe11c",
  storageBucket: "walkinportal-fe11c.appspot.com",
  messagingSenderId: "895062157560",
  appId: "1:895062157560:web:dc9aa45c95d1d029c2f30d",
  measurementId: "G-B9BYK9360Z"
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(
      withInterceptors([AuthInterceptor]),
      withFetch()
    ),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(() => getStorage())
    ]), provideAnimationsAsync()
  ]
};
