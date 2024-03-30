import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { SignUpComponent } from './Auth/components/sign-up/sign-up.component';
import { JsonInputComponent } from './Features/Json-to-Table/components/json-input/json-input.component';
import { JsonTableComponent } from './Features/Json-to-Table/components/json-table/json-table.component';
import { JsonPageComponent } from './Features/Json-to-Table/pages/json-page/json-page.component';
import { NotFoundComponent } from './Errors/components/not-found/not-found.component';
// imoport reactive forms module
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TableFilterPipe } from './Features/Json-to-Table/pipes/table-filter.pipe';
// import mat form field module and mat input module
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import mat icon
import { MatIconModule } from '@angular/material/icon';
// mat button module
import { MatButtonModule } from '@angular/material/button';
// import pagination module
import { MatPaginatorModule } from '@angular/material/paginator';
//mat card module
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    JsonInputComponent,
    JsonTableComponent,
    JsonPageComponent,
    NotFoundComponent,
    TableFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
