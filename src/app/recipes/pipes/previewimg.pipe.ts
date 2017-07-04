import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'previewimg'
})
export class PreviewimgPipe implements PipeTransform {

  transform(url: string): string {
    return url.replace('resize=w:2000,fit:max/', 'blur=a:15/resize=w:20/');
  }

}
