import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin:FormGroup;
  textoError:string = '';
  datosCorrectos:boolean = false;

  constructor(private creadorForm:FormBuilder,private afAuth:AngularFireAuth,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorForm.group({
      email: ['',Validators.compose([
        Validators.email,Validators.required
      ])],
      password: ['',Validators.required]
    })
  }

  ingresar(){
    if(this.formularioLogin.valid){
      this.spinner.show();
      this.datosCorrectos = true;
      this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario);
        this.spinner.hide();
      }).catch((err)=>{
        this.datosCorrectos = false;
        this.textoError = err.message;
        this.spinner.hide();
      })
    }else{
      this.datosCorrectos = false;
      this.textoError = 'Ingrese bien sus datos';
    }    
  }
}
