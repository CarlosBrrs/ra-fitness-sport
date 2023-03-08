import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) { }

  public loginWithGoogle(): void {
    console.log('Presionando el boton');
    this.afAuth.signInWithRedirect(new GoogleAuthProvider())
      .then((result) => {
        console.log('Te has logueado correctamente');
      }).catch((error) => {
        console.log('En el error');
        console.log(error);
      });
  }

}
