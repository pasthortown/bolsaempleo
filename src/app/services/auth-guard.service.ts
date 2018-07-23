import { AuthService } from './auth.service';
import { PermisoService } from './permiso.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private permisoService: PermisoService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      const rol = this.authService.rol();
      return this.permisoService.tieneAcceso(rol, url);
    }

    this.router.navigate(['/']);
    return false;
  }
}
