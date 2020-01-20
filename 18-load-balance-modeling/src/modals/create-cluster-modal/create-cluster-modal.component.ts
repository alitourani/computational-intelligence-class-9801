import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { AngularFireDatabase } from "@angular/fire/database";
import { FormBuilder, Validators } from "@angular/forms";
// import { ClusterService } from "src/services/cluster.service";

interface NewCluster {
  name;
  sens;
  delay;
}

@Component({
  selector: "app-create-cluster-modal",
  templateUrl: "./create-cluster-modal.component.html",
  styleUrls: ["./create-cluster-modal.component.scss"]
})
export class CreateClusterModalComponent implements OnInit {
  createClusterForm;
  sens = 0.5;
  delay = 50;
  type: string;
  id: string;
  name: string;
  constructor(
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    // private clusterService: ClusterService,
    public dialogRef: MatDialogRef<CreateClusterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  createCluster(data: NewCluster) {
    let pushId = this.db.createPushId();
    this.db.list("clustersInfo").set(pushId, {
      id: pushId,
      name: data.name
    });
    this.db.list("clusters").set(pushId, {
      id: pushId,
      name: data.name,
      sens: data.sens,
      delay: data.delay
    });
    // this.db.object(`clusters/${pushId}`).update({
    //   active: true
    // })
  }

  updateCluster(data) {
    this.db.object(`clustersInfo/${this.data.id}`).update({
      name: data.name
    });
    this.db.object(`clusters/${this.data.id}`).update({
      name: data.name,
      sens: data.sens,
      delay: data.delay
    });
    this.db.object(`clusters/${this.data.id}`).update({
      active: true
    })
  }

  onSubmit(clusterData) {
    if (this.data.type === "Update") {
      this.updateCluster({
        name: clusterData.name,
        sens: this.sens,
        delay: this.delay
      });
    } else if (this.data.type === "Create") {
      this.createCluster({
        name: clusterData.name,
        sens: this.sens,
        delay: this.delay
      });
    }

    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log(this.data);
    if (this.data.type == "Update") {
      // console.log(this.data);
      this.type = this.data.type;
      this.sens = this.data.sens;
      this.delay = this.data.delay;
      this.id = this.data.id;
      this.name = this.data.name;
    } else if (this.data.type === "Create") {
      this.type = this.data.type;
      this.name = "";
    }
    this.createClusterForm = this.formBuilder.group({
      name: [this.name, Validators.required]
    });
  }
  getTitle() {
    if (this.type === "Update") {
      return "Modify Cluster"
    } else {
      return "Create A New Cluster"
    }
  }
}
