import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(str: string, limit: number): string {
    return (str.length > limit) ? str.slice(0, limit - 1).trimEnd() + '...' : str;
  }

}
