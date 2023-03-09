import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(filter(appUser => appUser !== null), // Filtrar valores nulos
          map(appUser => appUser!.isAdmin) // Assertion de "!" porque filter garantiza que appUser no es nulo
        );
      }
    ;
  }
