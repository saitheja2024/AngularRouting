import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { SpinnerService } from "../../services/spinner/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinnerService.show();

      return next.handle(request).pipe(
        finalize(()=> {
          this.spinnerService.hide();
        })
      )
    }
  
  }