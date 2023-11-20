import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from "@app/services/api.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  private apiService = inject(ApiService)
  productsList = []

  ngOnInit(): void {
    if (localStorage.getItem('list'))
      this.productsList = JSON.parse(localStorage.getItem('list')!).slice(0, 10)
    else
      // this.apiService.getByBarcode('9780140157376').subscribe({
      this.apiService.getAllByBarcodeContains('091207').subscribe({
        next: (response: any) => {
          this.productsList = response.products.slice(0, 10)
          localStorage.setItem('list', JSON.stringify(response.products))
          console.log(this.productsList)
        },
        error: err => {
          console.log(err)
        }
      })
  }
}
