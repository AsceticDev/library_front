import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { AppModule } from "../../app.module";



@NgModule({
    declarations: [CompanyComponent],
    imports: [
        CommonModule,
        AppModule
    ]
})
export class CompanyModule { }
