import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any
  @Output() eventModal = new EventEmitter<any>();
  objectModal: any

  openModal(prod: any) {
    this.objectModal = prod
    this.eventModal.emit(this.objectModal);
  }
}
