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

  getAllByBarcodeContains(barcodeContains: string) {
    return this.http.get(this.url + '?barcode=' + barcodeContains + '*&formatted=y&' + this.key)
  }

  encodeStr = (text: string) => encodeURIComponent(text)

  genericSearch(form: any) {
    let param = ''
    if (form.search)
      param += this.encodeStr(form.search)
    console.log(param)
    let url = this.url + '?search=' + param + '&page=2' + '&formatted=y&' + this.key
    return this.http.get(url)
  }

  containsSearch(form: any) {
    console.log(form)
    let params = new HttpParams()
    if (form.manufacturer)
      params = params.set('manufacturer', this.encodeStr(form.manufacturer))
    if (form.mpn)
      params = params.set('mpn', this.encodeStr(form.mpn))
    if (form.category)
      params = params.set('category', this.encodeStr(form.category))
    if (form.brand)
      params = params.set('brand', this.encodeStr(form.brand))
    if (form.search)
      params = params.set('title', this.encodeStr(form.search))
    if (form.barcode)
      if (form.barcode.length >= 6)
        params = params.set('barcode', this.encodeStr(form.barcode) + '*')

    let url = this.url + '?' + params.toString() + '&formatted=y&' + this.key
    return this.http.get(url)
  }

  getSearch = (form: any, isGeneric: boolean) =>
    !isGeneric ? this.containsSearch(form) : this.genericSearch(form)

  rateLimits = () => this.http.get(environment.statusUrl + '?' + this.key)

}
