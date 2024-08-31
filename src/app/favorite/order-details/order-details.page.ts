import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderId:any;
  timeline:any[] = [];
  products:any[] = [];
  constructor(private route:ActivatedRoute,
              private shared:SharedService
  ) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.getOrderDetails();
  }

  async getOrderDetails(){
    console.log(this.orderId);
    this.shared.getOrderById(this.orderId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        
        this.products = value['data']['orderItems'];
        this.timeline = value['data']['orderTimeline'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

}
