import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {

  searchTerm:any;
  searchFilter:any = {name: ''};

  products:any[] = [];


  constructor(private shared:SharedService) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.getAllProducts();
  }
  getAllProducts(){
    this.shared.getAllProducts().subscribe({
      next:async(products:any) =>{
        console.log(products);
        this.products = products['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }


  addToCart(ev:any){
    console.log(ev.productId);
    console.log(ev.type.size);
    this.shared.addToCart(ev.productId, 1,ev.type.size)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

}
