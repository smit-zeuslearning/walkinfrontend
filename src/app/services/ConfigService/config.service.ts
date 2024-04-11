import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  configFileUrl: string = "../../../assets/config.json";

  constructor(private http: HttpClient) {
  }

  // Services which return whole config file
  getConfig(){
    return this.http.get<JSON>(this.configFileUrl);
  }

  getFirebaseConfig(){
    var firebaseConfig: any;
    this.http.get<JSON>(this.configFileUrl).subscribe(
      (data:any) => {
        firebaseConfig = {...data}
      }
    )

    return firebaseConfig;
  }
}
