import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.userService.get(user.uid).valueChanges().pipe(
          filter(appUser => appUser !== null), // Filtrar valores nulos
          map(appUser => appUser!.isAdmin) // Assertion de "!" porque filter garantiza que appUser no es nulo
        );
      })
    );
  }
  
}
