import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent  implements OnInit {

  @Input() productImageUrl!: string;
  @Input() productName!: string;
  @Input() productPrice!: string;
  @Input() _id!: string;
  @Input() size!: string;
  
  @Input()quantity!: number;
  selectedOption: string = 'wash';

  @Output() addEvent = new EventEmitter();
  @Output() removeEvent = new EventEmitter();
  incrementQuantity() {
    let obj = {
      size:this.size,
      id:this._id
    }
    this.addEvent.emit(obj);

  }

  decrementQuantity() {
    let obj = {
      size:this.size,
      id:this._id
    }
    this.removeEvent.emit(obj);
  }
  constructor(
              private toastController: ToastController,
  ) { }

  ngOnInit() {}
  async presentToast(msg:string, duration:any, color: string) {
    const toast = await this.toastController.create({
      message: msg,
   
      duration: duration,
      color: color,
      position:'bottom',
      animated:true,
      icon:'rocket',
      mode:'ios'
    });
    toast.present();
  }

  add(){
    
  }

}
