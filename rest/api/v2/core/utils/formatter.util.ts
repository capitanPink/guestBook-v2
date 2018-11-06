export class FormatterUtil {
  
  static objectToParams(object: any): string {
    return Object
            .keys(object)
            .reduce((acc, next) => `${acc}${acc === '?' ? '' : '&'}${next}=${object[next]}`, '?')
  }
}