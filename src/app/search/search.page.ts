import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  isLoading: boolean = false;
  searchItems: any[] = [];
  productFilter: any = { name: '' };
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  constructor(
    private modalController: ModalController,
    private shared: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchInput.nativeElement.focus();

  }


  ionViewDidEnter(){
    this.getAllProducts();

  }
 
  getAllProducts(){
    this.shared.getAllProducts().subscribe({
      next:async(products:any) =>{
        console.log(products);
        this.searchItems = products['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  openPage(data:any) {
    console.log(data);
    if (data['type'] == 'hotel') {
      this.router.navigate(['all-categories','category-detail',data['category'][0]['_id'], data['category'][0]['name'], 'hotel-detail', data['id'],data['name']]);
    } else if (data['type'] == 'category') {
      this.router.navigate(['all-categories', 'category-detail', data['id'], data['name']]);
    }
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }

}
