import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  private key = 'key=' + environment.key
  private url = environment.url

  getByBarcode(barcode: string) {
    return this.http.get(this.url + '?barcode=' + barcode + '&formatted=y&' + this.key)
  }

  getMax10ByBarcode(barcodeArray: string[]) {
    let barcodes = ''
    barcodeArray.forEach((v, i) => {
      barcodes += v
      if (i < barcodeArray.length - 1)
        barcodes += ','
    })
    return this.http.get(this.url + '?barcode=' + barcodes + '&formatted=y&' + this.key)
  }

  getAllByBarcodeContains(barcodeContains: string) {
    //6 digitos o mas
    return this.http.get(this.url + '?barcode=' + barcodeContains + '*&formatted=y&' + this.key)
  }
}
