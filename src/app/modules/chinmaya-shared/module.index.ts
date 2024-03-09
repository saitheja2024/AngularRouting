import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule, NgbDropdownModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalsModule } from "src/app/_metronic/partials";
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input'



export const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalsModule,
    NgbModule,
    NgbDropdownModule,
    NgbToastModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
]