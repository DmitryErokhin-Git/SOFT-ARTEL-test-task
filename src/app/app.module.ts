import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from './shared/components/modal/modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HighlighterPipe} from './shared/pipes/highlighter.pipe';
import {AppRoutingModule} from './app.routing';
import {TruncatePipe} from './shared/pipes/truncate.pipe';
import {CellComponent} from './shared/components/cell/cell.component';
import {CellCreateDirective} from './shared/directives/cell-create.directive';
import {TicketsComponent} from './components/tickets/tickets.component';
import {toastrConfig} from './shared/constants/constants';
import {TicketDetailsComponent} from './components/ticket-details/ticket-details.component';
import {TableComponent} from './components/table/table.component';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NgOptimizedImage} from "@angular/common";
import {TicketComponent} from './components/ticket/ticket.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RouterSerializer} from "./shared/store";
import {appEffects, appReducers} from "./shared/store";
import {environment} from "../environments/environment.dev";

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    HeaderComponent,
    TableComponent,
    TicketDetailsComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    TicketComponent
  ],
  imports: [
    CellComponent,
    ModalComponent,
    HighlighterPipe,
    CellCreateDirective,
    TruncatePipe,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot({serializer: RouterSerializer}),
    StoreDevtoolsModule.instrument({maxAge: 30, logOnly: environment.production}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
