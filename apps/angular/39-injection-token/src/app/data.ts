import { InjectionToken, ValueProvider } from '@angular/core';

export const DEFAULT_TIMER = new InjectionToken<number>('default-timer');

export const getTimerProvider = (timer: number): ValueProvider => ({
  provide: DEFAULT_TIMER,
  useValue: timer,
});
