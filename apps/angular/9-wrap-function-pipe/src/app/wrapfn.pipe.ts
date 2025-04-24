import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
  pure: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<TArgs extends any[], TResult>(
    args: TArgs,
    fn: (...args: TArgs) => TResult,
  ): TResult {
    console.log(args);
    return fn(...args);
  }
}
