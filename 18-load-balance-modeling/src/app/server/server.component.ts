import { Component, OnInit, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CreateClusterModalComponent } from "src/modals/create-cluster-modal/create-cluster-modal.component";
import { ServersModalComponent } from "../servers-modal/servers-modal.component";
import { ClientsModalComponent } from "../clients-modal/clients-modal.component";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.scss"]
})
export class ServerComponent implements OnInit {
  @Input() id: string;
  @Input() info;
  @Input() clusterId: string;
  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private db: AngularFireDatabase
  ) {
    this.matIconRegistry.addSvgIcon(
      `server`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../assets/iconmonstr-server-4.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `client`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../assets/iconmonstr-laptop-6.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `cpu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../assets/iconmonstr-cpu-6.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `ram`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/ram.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `disk`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../assets/iconmonstr-disk-2.svg`
      )
    );
  }

  ngOnInit() {}

  modifyServer() {
    const dialogRef = this.dialog.open(ServersModalComponent, {
      // width: '500px',
      data: {
        type: "Modify",
        serverId: this.id,
        info: this.info,
        clusterId: this.clusterId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  addOrRemoveClient() {
    let clients = {};
    if (this.info.hasOwnProperty("clients")) {
      clients = this.info.clients;
    }
    const dialogRef = this.dialog.open(ClientsModalComponent, {
      // width: '500px',
      data: {
        serverId: this.id,
        clusterId: this.clusterId,
        clients: clients
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }
  calcNumberOfClients() {
    if (this.info.hasOwnProperty("clients")) {
      return Object.keys(this.info.clients).length;
    } else {
      return 0;
    }
  }
  deleteServer() {
    // console.log(`clusters/${this.clusterId}/${this.id}`)
    this.db.object(`clusters/${this.clusterId}/servers/${this.id}`).remove();
  }
  status(s) {
    // console.log(s === this.info.status);
    if (s === this.info.status) {
      return true;
    }
  }
}
