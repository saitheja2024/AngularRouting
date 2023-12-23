import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalsModule } from "src/app/_metronic/partials";



export const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalsModule,
    NgbModule,
    NgbDropdownModule
]