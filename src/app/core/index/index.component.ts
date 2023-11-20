import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  private apiService = inject(ApiService)
  productsList = []
  objectModal: any

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

  openModal(prod: any, content: TemplateRef<any>) {
    this.objectModal = prod
    this.modalService.open(content)
  }
}
