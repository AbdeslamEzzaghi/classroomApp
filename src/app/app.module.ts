import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //DropdownDirective,
    //AuthComponent,
    //LoadingSpinnerComponent,
    //AlertComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    AppRoutingModule,
    //ReactiveFormsModule,
    HttpClientModule,
    //RecipesModule,
    //ShoppingListModule,
    SharedModule,
    CoreModule,
    //AuthModule,
  ],
  //providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
