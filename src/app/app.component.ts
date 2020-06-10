import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gym';
  usuario : User;
  cargando : boolean = true;

  constructor(private afAuth:AngularFireAuth){
    this.afAuth.user.subscribe((usuario)=>{
      this.usuario = usuario;
      this.cargando = false;
    })
  }
  
  logout(){
    this.afAuth.signOut();
  }
}
