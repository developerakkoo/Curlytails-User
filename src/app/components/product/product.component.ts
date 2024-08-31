import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {

  @Input() id!:any;

  @Input() productName!:string;
  @Input() productPrice!:any;
  @Input() rating!:any;
  @Input() imageUrl!:string;
  @Input() types!:any[];

  selectedType:any;

  @Output() addEvent = new EventEmitter();
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.types);
    
    this.selectedType = this.types[0];
  }

  typeSelectEvent(ev:any){
    console.log(ev.detail.value);
    this.selectedType = ev.detail.value;
    this.productPrice = ev.detail.value.price;
  }

  add(){
    let obj = {
      productId: this.id,
      type: this.selectedType
    }
    console.log(obj);
    

    this.addEvent.emit(obj);
  }

}
