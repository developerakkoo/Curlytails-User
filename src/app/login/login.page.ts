import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!:FormGroup;
  @ViewChild('input') input: any;
  constructor(private formBuilder: FormBuilder,
              private shared: SharedService,
              private storage: DataService,
              private router:Router
  ) { 
    this.form = this.formBuilder.group({
      phoneNo: ["",[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    })
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.input.setFocus();
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.shared.login(this.form.value)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          let token = value['data']['token'];
          let userId = value['data']['userId'];
          await this.storage.set("accessToken",token);
          await this.storage.set("userId",userId);
          this.router.navigate(['tabs','tabnav','home']);
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error);
          
        }
      })
    }
  }
}
