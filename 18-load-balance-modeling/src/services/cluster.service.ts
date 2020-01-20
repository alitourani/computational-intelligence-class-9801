// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';


// interface NewCluster {
//   name,
//   sens,
//   delay
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ClusterService {

//   constructor(private db: AngularFireDatabase) { }

//   createCluster(data: NewCluster){
//     let pushId = this.db.createPushId()

//     this.db.list('clustersInfo').set(pushId, {id: pushId, name: })
//     this.db.list('clusters').push({
//       id: pushId,
//       name: data.name,
//       sens: data.sens,
//       delay: data.delay
//     })
//   }
//   updateCluster(){}
// }
