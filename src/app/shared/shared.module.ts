import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';




@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
