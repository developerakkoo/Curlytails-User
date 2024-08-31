import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: DataService,
    private router: Router,
    private toastController: ToastController,
    private geo: Geolocation
  ) {
    // this.checkForPermission();
    this.checkForLoginStatus();
  }

  async checkForPermission() {
    Geolocation.requestPermissions()
      .then((value: any) => {
        console.log(value);
        this.presentToast('Permission Granted!', 'Success');
      })
      .catch((error: any) => {
        console.log(error);
        this.presentToast('Permission Error', 'Error!');
      });
  }
  async checkForLoginStatus() {
    let userId = await this.storage.get('userId');
    console.log(userId);
    if (userId != null || userId != undefined) {
      console.log('userid not null');
      // this.router.navigate(['']);
      this.router.navigate(['tabs', 'tabnav', 'home']);
    } else {
      this.router.navigate(['']);
    }
  }
  async presentToast(msg: string, header: string) {
    const toast = await this.toastController.create({
      message: msg,
      animated: true,
      mode: 'ios',
      header: header,
      duration: 2000,
    });
    toast.present();
  }
}
