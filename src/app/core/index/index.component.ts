import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
    config.backdrop = 'static'
    config.keyboard = false
    this.form = this.fb.group({
      search: [''],
      barcode: ['', [Validators.maxLength(14), Validators.minLength(6)]],
      manufacturer: [''],
      mpn: [''],
      category: ['']
    })
  }

  private apiService = inject(ApiService)
  productsList = []
  objectModal: any
  loader = true
  min = 0
  month = 0
  exactSearch = true
  form: FormGroup

  ngOnInit(): void {
    this.loader = true
    this.rateLimits()
    if (localStorage.getItem('list')) {
      this.productsList = JSON.parse(localStorage.getItem('list')!).slice(0, 10)
      this.loader = false
    } else
      // this.apiService.getByBarcode('9780140157376').subscribe({
      this.apiService.getAllByBarcodeContains('091207').subscribe({
        next: (response: any) => {
          this.productsList = response.products.slice(0, 10)
          localStorage.setItem('list', JSON.stringify(response.products))
          console.log(this.productsList)
          this.loader = false
        },
        error: err => {
          console.log(err)
        }
      })
  }

  rateLimits() {
    this.apiService.rateLimits().subscribe((data: any) => {
      this.min = data.remaining_calls_per_minute
      this.month = data.remaining_calls_per_month
    })
  }

  openModal(prod: any, content: TemplateRef<any>) {
    this.objectModal = prod
    this.modalService.open(content)
  }

  changeSearch() {
    this.form.reset()
  }
}
