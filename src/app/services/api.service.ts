import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "@src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  private key = 'key=' + environment.key
  private url = environment.url
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  }

  getByBarcode(barcode: string) {
    return this.http.get(this.url + '?barcode=' + barcode + '&formatted=y&' + this.key, this.httpOptions)
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

  encodeStr = (text: string) => encodeURIComponent(text)

  genericSearch(form: any) {
    console.log(form)
    let param = '', barcode = ''
    if (form.search)
      param += this.encodeStr(form.search)
    /*    if (form.manufacturer)
          param += this.encodeStr(form.manufacturer + ' ')
        if (form.mpn)
          param += this.encodeStr(form.mpn + ' ')
        if (form.category)
          param += this.encodeStr(form.category + ' ')

        if (form.barcode)
          if (form.barcode.length >= 6)
            barcode += form.barcode + '*'*/
    console.log(barcode)
    console.log(param)
    let url = this.url + '?search=' + param + '&page=2' + '&formatted=y&' + this.key
    console.log(url)
    //llamar la api
    return this.http.get(url)
  }

  exactSearch(form: any) {
    console.log(form.barcode)
    let params = new HttpParams()
    params = params.set('barcode', form.barcode)
    console.log(params.toString())
    return this.rateLimits()
  }

  getSearch = (form: any, isGeneric: boolean) =>
    !isGeneric ? this.exactSearch(form) : this.genericSearch(form)

  rateLimits = () => this.http.get(environment.statusUrl + '?' + this.key)

}
