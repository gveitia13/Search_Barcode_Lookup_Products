import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";

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
  resultList = []
  objectModal: any
  loader = true
  isActiveSearch = false
  min = 0
  month = 0
  isExactSearch = true
  form: FormGroup
  inputSubject: Subject<any> = new Subject();

  ngOnInit(): void {
    this.loader = true
    this.rateLimits()
    setInterval(() => this.rateLimits(), 60000)
    this.getSampleProducts()

    this.inputSubject.pipe(
      debounceTime(1000) // Retrasa las llamadas a la API 1 segundo
    ).subscribe(form => {
      this.resultList = []
      this.apiService.getSearch(form, this.isExactSearch).subscribe(response => {
        console.log(response);
        // hacerme la idea que recibo datos
        this.resultList = this.productsList
        this.loader = false
      });
    });
  }

  searchAPI($event: any) {
    this.loader = true
    //If si el form esta vacio
    //return y no llamo a la api
    this.isActiveSearch = true
    console.log(this.form.value)
    this.inputSubject.next(this.form.value);
  }

  getSampleProducts() {
    if (localStorage.getItem('list')) {
      this.productsList = JSON.parse(localStorage.getItem('list')!).slice(0, 10)
      this.loader = false
    } else
      this.apiService.getAllByBarcodeContains('091207').subscribe({
        next: (response: any) => {
          this.productsList = response.products.slice(0, 10)
          localStorage.setItem('list', JSON.stringify(response.products))
          this.loader = false
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
    this.isActiveSearch = false
  }

}
