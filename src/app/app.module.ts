import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RelatorioService } from './servicce/relatorio.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CorsInterceptor } from './servicce/cors-interceptor';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroComponent } from './components/filtro/filtro/filtro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabelaComponent } from './components/tabela/tabela/tabela.component';


@NgModule({
  declarations: [
    AppComponent,
    FiltroComponent,
    TabelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    PaginatorModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    
  ],
  providers: [
    RelatorioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
