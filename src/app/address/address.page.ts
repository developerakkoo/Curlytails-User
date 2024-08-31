import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  @Input() value!: any;
  coords:any;
  address:any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage:DataService,
    private shared:SharedService,
  ) {}

  ngOnInit() {
    console.log(this.value);
    this.coords = this.value;
  }

  ionViewDidEnter(){
    this.getAllAddress();
 }

  getAllAddress(){
    this.shared.getUserAddress().subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.address = value['data'];
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }
  openMapsAddressPage() {
    this.close();
    console.log(this.coords);
    
    this.router.navigate(['address', 'add']);
    // this.router.navigate(['address', 'map-address',this.coords['coords']['latitude'],this.coords['coords']['longitude']]);
  }

  close() {
    this.modalController.dismiss();
  }

  async setAddressDefault(address:any){
    console.log(address);
    await this.storage.set("address", address);
    // this.shared.address.next(address);
    this.modalController.dismiss(address);
    
  }

}
