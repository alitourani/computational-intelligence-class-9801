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
  selector: "app-update-cluster",
  templateUrl: "./update-cluster.component.html",
  styleUrls: ["./update-cluster.component.scss"]
})
export class UpdateClusterComponent implements OnInit {
  createClusterForm;
  sens = 0.5;
  delay = 50;
  type: string
  id: string
  name: string

  constructor(
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    // private clusterService: ClusterService,
    public dialogRef: MatDialogRef<UpdateClusterComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.createClusterForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

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
  }

  onSubmit(clusterData) {
    // console.log(clusterData);
    // console.log(this.delay, this.sens);
    this.createCluster({
      name: clusterData.name,
      sens: this.sens,
      delay: this.delay
    });
    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log(this.data);
    if(this.data.type = 'Update') {
      // console.log(this.data)
      this.type = this.data.type;
      this.sens = this.data.sens;
      this.delay = this.data.delay;
      this.id = this.data.id;
      this.name = this.data.name
    }
  }
}
