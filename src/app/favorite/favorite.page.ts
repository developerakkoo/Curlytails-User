import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  orders:any[] = [];

  isLoading:boolean = false;
  refundReason:string = "";


  constructor(private shared:SharedService,
              private router:Router,
              private alertController: AlertController
  ) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.getOrders();
  }

  async getOrders(){
    this.shared.getOrders()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.orders = value['data'];
      },
      error:(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }


  openOrderDetailsPage(item:any){
    console.log(item);
    this.router.navigate(['tabs','tabnav','favorite','order-details',item?._id]);
    
  }


  async presentAlertConfirm(item:any) {
    const alert = await this.alertController.create({
      header: 'Confirm Cancellation',
      message: 'Once cancelled it cannot be undone.',
      inputs:[
        {
          label:"Reason for cancellation",
          placeholder:"Reason for cancellation",
          handler(input) {
              console.log(input);
              
          },
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (value:any) => {
            console.log('Confirm Okay');
            console.log(value);
            this.refundReason = value[0];
            let obj = {

              orderId: item,
              description: this.refundReason,
             }
          
          
             console.log(obj);
            
             this.shared.addRefundRequest(this.refundReason)
             .subscribe({
              next:async(value:any) =>{
                console.log(value);
                this.updateOrderStatus(item);
              },
              error:async(error:HttpErrorResponse) =>{
                console.log(error);
                
              }
             })
          }
        }
      ]
    });
  
    await alert.present();
  }


  updateOrderStatus(id:any){
    this.shared.updateOrder(id,4)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
          this.getOrders();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
  openRefundPage(item:any){
    console.log(item);
    
  
   this.presentAlertConfirm(item._id);
  }
}
