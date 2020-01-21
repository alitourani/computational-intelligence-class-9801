import { Component, OnInit, Inject } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServersModalComponent } from "../servers-modal/servers-modal.component";

@Component({
  selector: "app-clients-modal",
  templateUrl: "./clients-modal.component.html",
  styleUrls: ["./clients-modal.component.scss"]
})
export class ClientsModalComponent implements OnInit {
  addClientsForm;
  removeClientsForm;

  constructor(
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    // private clusterService: ClusterService,
    public dialogRef: MatDialogRef<ServersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData
  ) {}

  ngOnInit() {
    this.addClientsForm = this.formBuilder.group({
      quantity: [1, Validators.required],
      cpuUsage: [1, Validators.required],
      ramUsage: [20, Validators.required],
      hardUsage: [100, Validators.required]
    });

    this.removeClientsForm = this.formBuilder.group({
      numberOfRemove: [1, Validators.required]
    });
  }

  addClients(formData) {
    this.db.object(`clusters/${this.receivedData.clusterId}`).update({
      active: false
    })
    console.log(formData);
    let data = {
      ramUsage: formData.ramUsage,
      cpuUsage: formData.cpuUsage,
      hardUsage: formData.hardUsage
    };
    for (let i = 0; i < formData.quantity; i++) {
      this.db
        .list(
          `clusters/${this.receivedData.clusterId}/servers/${this.receivedData.serverId}/clients`
        )
        .push(data);
    }
    this.db.object(`clusters/${this.receivedData.clusterId}`).update({
      active: true
    })
    this.dialogRef.close();
    // this.db.object(`clusters/${this.receivedData.clusterId}`).update({
    //   active: true
    // })
  }

  removeClients(formData) {
    this.db.object(`clusters/${this.receivedData.clusterId}`).update({
      active: false
    })
    let clients = this.receivedData.clients;
    let numberOfClients = Object.keys(clients).length;
    if (formData.numberOfRemove < numberOfClients) {
      for (let i = 0; i < formData.numberOfRemove; i++) {
        this.db
          .object(
            `clusters/${this.receivedData.clusterId}/servers/${
              this.receivedData.serverId
            }/clients/${Object.keys(clients)[i]}`
          )
          .remove();
      }
    }
    this.db.object(`clusters/${this.receivedData.clusterId}`).update({
      active: true
    })
    this.dialogRef.close();
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
