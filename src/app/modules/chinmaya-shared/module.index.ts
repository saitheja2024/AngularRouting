import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule, NgbDropdownModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalsModule } from "src/app/_metronic/partials";
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';

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
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTabsModule
]