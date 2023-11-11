import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ErrorHandlerService } from "../errors/error-handler.service";


export interface Options {
    body: any,
    headers?: any,
    queryParams?: any,
    url:any
  }

@Injectable({
    providedIn: 'root'
  })

export class HttpService{
    token: any;

    constructor(
        private httpClient: HttpClient,
        private errorHandler:ErrorHandlerService
      ) { }

    get(opt:any) {
        console.log("============= [HttpSerive] Get method invoked with following parameters =============== ");

        return new Promise(async (resolve,reject)=>{
          let token:any = await this.getToken(); 
          let headers=new HttpHeaders({
              'Authorization': `Bearer ${token.accessToken}`
          });
          //headers.set();
          // console.log(JSON.stringify(opt,null,4))
          
          this.httpClient.get(environment.baseURL+opt.url,{headers})
          .pipe(
              catchError((error:any)=>{
                 
                  return this.errorHandler.handleError(error)
              })
            )
          .subscribe(resp=>{
              // console.log(JSON.stringify(resp,null,4))
              resolve(resp);    
            }
          );  
      })
      
      
      }



      post(opt:any) {
        console.log("============= [HttpSerive] Post method invoked with following parameters =============== ");

        return new Promise(async (resolve,reject)=>{
            let token:any = await this.getToken(); 
            let headers=new HttpHeaders({
                'Authorization': `Bearer ${token.accessToken}`
            });
            //headers.set();
            // console.log(JSON.stringify(opt,null,4))
            this.httpClient.post(environment.baseURL+opt.url,opt?.body,{headers})
            .pipe(
                catchError((error:any)=>{
                    return this.errorHandler.handleError(error)
                })
              )
            .subscribe(resp=>{
                // console.log(JSON.stringify(opt,null,4))
                // console.log(JSON.stringify(resp,null,4))
                resolve(resp);    
              }
            );  
        })
       
      }


      delete(opt:any) {
        console.log("============= [HttpSerive] Post method invoked with following parameters =============== ");

        return new Promise(async (resolve,reject)=>{
            let token:any = await this.getToken(); 
            let headers=new HttpHeaders({
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type':'application/json'
            });
            //headers.set();
            // console.log(JSON.stringify(opt,null,4))
            this.httpClient.delete(environment.baseURL+opt.url,{body:opt?.body})
            .pipe(
                catchError((error:any)=>{
                   
                    return this.errorHandler.handleError(error)
                })
              )
            .subscribe(resp=>{
                // console.log(JSON.stringify(opt,null,4))
                // console.log(JSON.stringify(resp,null,4))
                resolve(resp);    
              }
            );  
        })
       
      }


    async getToken() {
       
        return new Promise((resolve,reject)=>{

       if(this.token){
            resolve(this.token);
            return;
       }

        const dataF: object = { "username": "root", "password": "Technology@@09" };
         this.httpClient.post(environment.baseURL+"auth/login", dataF).
            subscribe(resp=>{
            this.token=resp;
             resolve(resp);  
             //localStorage.setItem('currentUser', JSON.stringify(resp));
  
            }); 
        });    
    }
}  