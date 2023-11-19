import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from "@app/services/api.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  private apiService = inject(ApiService)

  ngOnInit(): void {
    this.apiService.getByBarcode('9780140157376').subscribe(value => {
      console.log(value)
    })
  }
}
