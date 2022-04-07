import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  public env: any;
  public customEnvironment: string = '';
  public showCustomEnvironment: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.env = environment;
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.pattern('.*@.*')]],
      password: ['test', [Validators.required, Validators.minLength(4)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if( this.customEnvironment !== '' && this.showCustomEnvironment === true ) {
      localStorage.setItem('SELECTED_ENVIRONMENT', this.customEnvironment);
    }

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tool-selector/Landing-Page', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  selectEnvironment( event ){
    const env = event.target.value.toLowerCase();
    if (env === 'prod') {
      localStorage.setItem('SELECTED_ENVIRONMENT', environment.api_prod_url);
    }
    else if (env === 'qa') {
      localStorage.setItem('SELECTED_ENVIRONMENT', environment.api_qa_url);
    }
    else if (env === 'dev') {
      localStorage.setItem('SELECTED_ENVIRONMENT', environment.api_dev_url);
    }
    else if (env === 'custom') {
      this.showCustomEnvironment = true;
    }
  }

  updateCustomEnvironment( event ) {
    this.customEnvironment = event.target.value;
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
