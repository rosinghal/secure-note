import {Pipe, PipeTransform, Sanitizer, SecurityContext} from '@angular/core';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer:Sanitizer){}

  transform(style: any): any {
    return this.sanitizer.sanitize(SecurityContext.HTML, style);
  }

}
