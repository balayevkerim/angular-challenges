import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calc',
  standalone: true,
  pure: true,
})
export class CalculateFib implements PipeTransform {
  transform(value: number) {
    return fibonacci(value);
  }
}

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
