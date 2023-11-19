import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {ProductComponent} from './components/product/product.component';
import {IndexRoutingModule} from "@app/core/index/index-routing.module";


@NgModule({
  declarations: [
    IndexComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule {
}
