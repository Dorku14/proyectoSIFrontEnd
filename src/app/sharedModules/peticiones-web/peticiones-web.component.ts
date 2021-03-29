import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {direccionHttp} from '../../sharedModules/constantes'
import {FuncionesGenerales} from '../../sharedModules/funcionesgenerales'
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-peticiones-web',
  templateUrl: './peticiones-web.component.html',
  styleUrls: ['./peticiones-web.component.scss']
})
export class PeticionesWebComponent implements OnInit {
  @Input() isCargando;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'json'
      })
    }
  constructor(private http: HttpClient,private funcGeneral:FuncionesGenerales,private cookieService:CookieService,private router: Router) {
   }

  ngOnInit(): void {
  }

  /**
    *\brief   función que realiza una petición por post
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    24/08/2020
    *\version	1.00.00
    @param json -> json de entrada
  */
  peticionPost(json,rutaServicio:string,validaToken=true) {
    this.isCargando = true;
    return new Promise((resolve,reject)=>{
      if(validaToken){
        this.validaToken().then(()=>{
          json = !this.funcGeneral.EsVacioNulo(json) ? json : {};
          let url = direccionHttp+rutaServicio;//'ingreso/consulta'
          this.http.post(url,json,this.httpOptions).toPromise().then((resultado:any)=>{
          this.isCargando = false;
          resolve(resultado);
          }).catch((error)=>{
            this.isCargando = false;
            reject(error);
          });
        }).catch(()=>{
          this.router.navigateByUrl('');
          reject();
        });
      }else{
        json = !this.funcGeneral.EsVacioNulo(json) ? json : {};
        let url = direccionHttp+rutaServicio;//'ingreso/consulta'
        this.http.post(url,json,this.httpOptions).toPromise().then((resultado:any)=>{
        this.isCargando = false;
        resolve(resultado);
        }).catch((error)=>{
          this.isCargando = false;
          reject(error);
        });
      }

    });
  }

 /**
    *\brief  valida si el token está vigente
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    24/08/2020
    *\version	1.00.00
  */
  validaToken(){
    let t = { t: this.cookieService.get("idSession") };
    let rutaServicio = "EstadoSesion";
    this.isCargando = true;
    return new Promise((resolve, reject) => {
      let url = direccionHttp + rutaServicio;//'ingreso/consulta'
      this.http.post(url, t, this.httpOptions).toPromise().then((resultado: any) => {
        this.isCargando = false;
        if(resultado.code === "00"){
          resolve(resultado);
        }else{
          reject();
        }

      }).catch((error) => {
        this.isCargando = false;
        reject(error);
      });
    });
  }

}
