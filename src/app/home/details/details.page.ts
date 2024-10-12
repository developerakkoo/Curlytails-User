import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  productId:any;
  constructor(private route:ActivatedRoute,
              private shared:SharedService,
              private loadingController: LoadingController) {
    this.productId = this.route.snapshot.paramMap.get("id");
    console.log(this.productId);
    
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getProductDetails();
  }

  async getProductDetails(){

  }
}
