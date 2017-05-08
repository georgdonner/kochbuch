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
      console.log('height set' + newUrl);
    }
    else if (height === 0) {
      newUrl = url.replace(/(w:\d+)/g, 'w:' + width);
      console.log('width set' + newUrl);
    }
    else {
      newUrl = url.replace(/(w:\d+)/g, 'w:' + width + 'h:' + height);
      console.log('both set' + newUrl);
    }
    console.log(newUrl);
    return newUrl;
  }

}
