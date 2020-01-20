import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CreateClusterModalComponent } from "src/modals/create-cluster-modal/create-cluster-modal.component";
import { ServersModalComponent } from "../servers-modal/servers-modal.component";

const worker = new Worker("../app.worker", { type: "module" });

@Component({
  selector: "app-cluster",
  templateUrl: "./cluster.component.html",
  styleUrls: ["./cluster.component.scss"]
})
export class ClusterComponent implements OnInit {
  clusterId;
  clusterInfo;
  clusterData;
  numberOfServers = 0;
  start: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clusterId = params.get("clusterId");
      worker.onmessage = ({ data }) => {
        this.db.object(`clusters/${this.clusterId}`).set(data);
      };
      this.clusterInfo = this.db
        .object(`clusters/${this.clusterId}`)
        .valueChanges();
      this.clusterInfo.subscribe(data => {
        this.calcNumberOfServers();
        this.clusterData = data;
        if (data.active && this.start) {
          worker.postMessage(data);
        }
        // console.log(this.clusterData)
        // console.log(...this.clusterData.servers)
        // console.log(typeof this.clusterData.servers)
        // for (let key in this.clusterData.servers) {
          // console.log(key, this.clusterData.servers[key]);
        // }
        // for (const [key, value] of data.servers) {
        //   console.log(`There are ${key} ${value}s`)
        // }
      });
    });
  }

  updateCluster() {
    const dialogRef = this.dialog.open(CreateClusterModalComponent, {
      // width: '500px',
      data: { type: "Update", ...this.clusterData }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  addServer() {
    const dialogRef = this.dialog.open(ServersModalComponent, {
      // width: '500px',
      data: { type: "Add", clusterId: this.clusterId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  deleteCluster() {
    this.db.object(`clusters/${this.clusterId}`).remove();
    this.db.object(`clustersInfo/${this.clusterId}`).remove();
  }

  calcNumberOfServers() {
    if (this.clusterInfo.hasOwnProperty("servers")) {
      this.numberOfServers = Object.keys(this.clusterInfo.servers).length;
    } else {
      this.numberOfServers = 0;
    }
  }

  ngOnDestroy() {
    this.clusterInfo.unsubscribe();
    worker.terminate();
  }

  toggleStart() {
    this.start = !this.start;
    if (this.start) {
      worker.postMessage(this.clusterData);
      // this.clusterData
    }
    // if (!this.clusterData.active && this.start) {
    //   this.db.object(`clusters/${this.clusterId}`).update({
    //     active: true
    //   });
    // }
  }
  getStart() {
    if (this.start) {
      return "Stop";
    } else {
      return "Start";
    }
  }
}
