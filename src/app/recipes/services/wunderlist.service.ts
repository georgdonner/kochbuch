import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class WunderlistService {

  constructor(private http: Http) { }

  getAccessToken(code: string) {
    console.log(JSON.stringify(code));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log(headers);
    return this.http.post('https://www.wunderlist.com/oauth/access_token', {
      "client_id": "b4ab80671b8df7024e4d",
      "client_secret": "d3249ae86687441fdb19203c82c9c339b7052384155677ba2492f523f5b9",
      "code": JSON.stringify(code)
    }, {headers: headers})
    .map(res => res.json());
  }

}
