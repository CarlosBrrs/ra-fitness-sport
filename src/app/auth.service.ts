import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState as Observable<firebase.User>;
  }

  public login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  public logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges() as Observable<AppUser>;
      return of(null);
    }
    ));
  }
}

