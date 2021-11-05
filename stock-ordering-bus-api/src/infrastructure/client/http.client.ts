import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig } from "axios";
import { ConfigService } from "../configuration/config.service";
import { OrderSettingConstants } from "../constants/order-setting";
import { Observable } from "rxjs";
import { Injectable } from "@nestjs/common";
import { map } from "rxjs";




@Injectable()
export class HttpClient {

  constructor(private httpService: HttpService) {
    console.log("Httpclient object created")
  }

  public async get(url: string) {

    let responsedata: any
    var baseUrl = ConfigService.create().getBaseURl(OrderSettingConstants.MASTER_BASE_URL)

    console.log("URl :", baseUrl + url)
    var env = ConfigService.create().isProduction();
    if (env) {

      console.log("Enter into production Block")
      const tokenObservable = this.getIdentityToken(baseUrl);
      console.log(tokenObservable)
      await tokenObservable.subscribe(response => {
        var token = response.data;
        console.log("token :", token)

        const requestConfig: AxiosRequestConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }

        responsedata = this.httpService.get(baseUrl + url).pipe(map(resp => (resp.data)));
      });
    } else {
      console.log("Enter into Dev Block")
      responsedata = this.httpService.get(baseUrl + url).pipe(map(resp => (resp.data)));
    }
    console.log(responsedata)
    return responsedata;
  }

  private getIdentityToken(recipientUrl) {
    /*if (
      process.env.GCP_IDENTITY_TOKEN &&
      isActive(process.env.GCP_IDENTITY_TOKEN)
    ) {
      return process.env.GCP_IDENTITY_TOKEN;
    }*/
    const requestConfig: AxiosRequestConfig = {
      params: {
        audience: recipientUrl,
      },
      headers: {
        'metadata-flavor': 'Google',
      }
    }
    return this.httpService.get(process.env.GCP_IDENTITY_TOKEN_URL, requestConfig);
  }

}