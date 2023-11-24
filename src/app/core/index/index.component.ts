import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
      category: [''],
      brand: ['']
    })
  }

  private apiService = inject(ApiService)
  productsList = []
  resultList = []
  objectModal: any
  loader = true
  isActiveSearch = false
  isGenericSearch = true
  isExactSearch = false
  min = 0
  month = 0
  notFound = false
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
      // Valido si el form esta vacío y pongo lista default de muestra
      if (this.isEmptyForm()) {
        this.loader = false
        this.isActiveSearch = false
        return
      }
      //Llamada al servicio para acceder a la API
      this.apiService.getSearch(form, this.isGenericSearch).subscribe({
        next: (response: any) => {
          this.resultList = response.products
          this.loader = false
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.notFound = true
            this.loader = false
          }
        },
        complete: () => this.rateLimits()
      })
    })
  }

  searchAPI($event: any) {
    /*Llamada al subject para subscribirse*/
    this.loader = true
    this.isActiveSearch = true
    this.notFound = false
    this.inputSubject.next(this.form.value);
  }

  getSampleProducts() {
    /*Obtener productos de muestra*/
    if (localStorage.getItem('list')) {
      this.productsList = JSON.parse(localStorage.getItem('list')!)
      this.loader = false
    } else
      this.apiService.getAllByBarcodeContains('091207').subscribe({
        next: (response: any) => {
          console.log(response)
          this.productsList = response.products
          localStorage.setItem('list', JSON.stringify(response.products))
          this.loader = false
        }
      })
  }

  rateLimits() {
    /*Estado del api*/
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

  isEmptyForm() {
    /*  Verifica si el formulario esta vacío completo*/
    const fields: string[] = ['manufacturer', 'mpn', 'category', 'brand', 'search']
    for (let field of fields)
      if (this.form.value[field])
        return false
    return !(this.form.value.barcode && this.form.value.barcode.length >= 6)
  }
}
