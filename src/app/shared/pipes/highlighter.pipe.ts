import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlighter',
  standalone: true,
})
export class HighlighterPipe implements PipeTransform {

  transform(text: any, search: any): any {
    if (!search) return text;
    if (typeof text === 'string') {
      const pattern: RegExp = new RegExp(search, 'gi');
      return text.replace(pattern, `<span class="highlighted-text">$&</span>`);
    }
  }

}
