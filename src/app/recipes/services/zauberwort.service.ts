import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZauberwortService {
  hasPermission = false;

  constructor(public http: Http) { }

  async requestPermissions(zauberwort: string): Promise<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    await this.http.post('zauberwort', JSON.stringify({zauberwort: zauberwort}), {headers: headers}).toPromise()
      .then(res => {
        if (res.status === 200) {
          this.hasPermission = true;
        } else {
          this.hasPermission = false;
        }
      })
      .catch(err => {
        this.hasPermission = false;
      });
    return this.hasPermission;
  }

  canModify() {
    return this.hasPermission;
  }

}
