import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(url: string, width: number, height: number): string {
    let newUrl;
    if (width === 0) {
      const h = 'h:' + height;
      newUrl = url.replace(url.match(/(w:\d+)/g)[0], h);
    }
    else if (height === 0) {
      newUrl = url.replace(/(w:\d+)/g, 'w:' + width);
    }
    else {
      newUrl = url.replace(/(w:\d+)/g, 'w:' + width + 'h:' + height);
    }
    return newUrl;
  }

}
