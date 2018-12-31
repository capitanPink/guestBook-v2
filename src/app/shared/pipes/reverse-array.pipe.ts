import { Pipe, PipeTransform } from '@angular/core';

import { ICommentObject } from './../../../../shared/interfaces/i-comment-object';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: (ICommentObject[] | undefined)): (ICommentObject[] | undefined) {
      if (!value) return;
      return value.reverse();
    }
}