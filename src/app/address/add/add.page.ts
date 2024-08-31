import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @Input() value: any;
  @Input() location: any;
  form: FormGroup;

  helperText:string = "We Deliver only in Kharadi,Pune.";
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private shared:SharedService,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      address: [this.value, [Validators.required]],
      pincode: ["", [Validators.required,this.pincodeValidator(['123456', '654321', '789012'])]],
      type: [, [Validators.required]],
      isSelected: [, [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.value);
    console.log(this.location);
    
    this.form.patchValue({ address: this.value });
    this.form.get('pincode')?.valueChanges.subscribe({

      next:(value:any) =>{
 if (this.form.get('pincode')?.hasError('invalidPincode') && this.form.get('pincode')?.touched) {
        this.helperText = "Pincode is not valid.";
      } else {
        this.helperText = "Please enter your pincode.";
      }
      }
      
     
    });
  }

  close() {
    this.modalController.dismiss();
  }
   pincodeValidator(allowedPincodes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = allowedPincodes.includes(control.value);
      return isValid ? null : { invalidPincode: true };
    }

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your address Added!.',
      duration: 2000,
      animated:true,
      mode:"ios",
      color:"primary"
    });
    toast.present();
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log({
        address: this.form.value.address,
        type: this.form.value.type,
        selected: this.form.value.isSelected,
        lat:"0",
        lng:"0",
      });
      this.shared.addAddress({
        address: this.form.value.address,
        type: this.form.value.type,
        selected: this.form.value.isSelected,
        lat: "0",
        lng:"0",
      }).subscribe({
        next: async (value: any) => {
          console.log(value);
          this.presentToast();
          this.close();
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error.error.message);
        },
      });
    }
  }

}
