import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {ProductComponent} from './components/product/product.component';
import {IndexRoutingModule} from "@app/core/index/index-routing.module";
import {CarouselComponent} from './components/carousel/carousel.component';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    IndexComponent,
    ProductComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgbCarousel,
    NgbSlide
  ]
})
export class IndexModule {
}
