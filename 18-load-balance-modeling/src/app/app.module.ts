import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateClusterModalComponent } from "../modals/create-cluster-modal/create-cluster-modal.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
// import { ClusterService } from 'src/services/cluster.service';
import { ClusterComponent } from "./cluster/cluster.component";
import { RouterModule } from "@angular/router";
import { UpdateClusterComponent } from "./update-cluster/update-cluster.component";
import { ServersModalComponent } from "./servers-modal/servers-modal.component";
import { ServerComponent } from "./server/server.component";
import { MatCardModule } from "@angular/material/card";
import { ClientsModalComponent } from "./clients-modal/clients-modal.component";
import { MatDividerModule } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    CreateClusterModalComponent,
    ClusterComponent,
    UpdateClusterComponent,
    ServersModalComponent,
    ServerComponent,
    ClientsModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      // { path: '', component: ProductListComponent },
      { path: "clusters/:clusterId", component: ClusterComponent }
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule
  ],
  entryComponents: [
    AppComponent,
    ServersModalComponent,
    CreateClusterModalComponent,
    ClusterComponent,
    UpdateClusterComponent,
    ClientsModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
