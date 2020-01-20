export interface Server {
  ram: number;
  cpu: number;
  hard: number;

  clients?: Array<Client>;

  ramUsage?: number;
  cpuUsage?: number;
  hardUsage?: number;

  ramUtilization?: number;
  cpuUtilization?: number;
  hardUtilization?: number;

  load?: number;
  fuzzyLoad?: fuzzyLoad;
  fuzzyOutput?: fuzzyOutput;
  status?: status;
  loadMinusAverage?: fuzzyLoad;
}

export interface Cluster {
  servers: Array<Server>;

  delay: number;

  ramCapacity?: number;
  cpuCapacity?: number;
  hardCapacity?: number;

  ramUsage?: number;
  cpuUsage?: number;
  hardUsage?: number;

  ramUtilization?: number;
  cpuUtilization?: number;
  hardUtilization?: number;

  load?: number;
  fuzzyLoad?: fuzzyLoad;
  status?: Array<status>;
  active?: boolean;
  senderIndex?: number;
  receiverIndex?: number;
  senderKey?: string;
  receiverKey?: string;
  sens?: number;
}

export interface Client {
  ramUsage: number;
  cpuUsage: number;
  hardUsage: number;
}

export function addClient(client: Client, server: Server) {
  server.clients.push(client);
  return server;
}

// for (let key in this.clusterData.servers) {
//   console.log(key, this.clusterData.servers[key]);
// }

type fuzzyLoad = [number, number, number, number, number];
type fuzzyOutput = [number, number, number];
type status = -1 | 0 | 1;

export function calServerUtilization(server: Server): Server {
  // console.log(server);
  let totalRamUsage: number = 0;
  let totalCpuUsage: number = 0;
  let totalHardUsage: number = 0;

  if (server.hasOwnProperty("clients")) {
    for (let key in server.clients) {
      totalRamUsage = totalRamUsage + server.clients[key].ramUsage;
      totalCpuUsage = totalCpuUsage + server.clients[key].cpuUsage;
      totalHardUsage = totalHardUsage + server.clients[key].hardUsage;
    }
  } else {
    server.ramUtilization = 0;
    server.cpuUtilization = 0;
    server.hardUtilization = 0;
    return server;
  }

  //   for (let i = 0; i < server.clients.length; i++) {
  //     totalRamUsage = totalRamUsage + server.clients[i].ramUsage;
  //     totalCpuUsage = totalCpuUsage + server.clients[i].cpuUsage;
  //     totalHardUsage = totalHardUsage + server.clients[i].hardUsage;
  //   }

  server.ramUsage = totalRamUsage;
  server.cpuUsage = totalCpuUsage;
  server.hardUsage = totalHardUsage;

  server.ramUtilization = (totalRamUsage / server.ram) * 100;
  server.cpuUtilization = (totalCpuUsage / server.cpu) * 100;
  server.hardUtilization = (totalHardUsage / server.hard) * 100;
  return server;
}

export function calServerLoad(server: Server): Server {
  if (server.hardUtilization >= 100) {
    server.load = 100;
  } else {
    server.load = Math.max(server.cpuUtilization, server.ramUtilization);
  }
  return server;
}

//  function fuzzifyServer(inputs: Array<Server>): Array<Server> {
//     for (let i = 0; i < inputs.length; i++) {
//         inputs[i].fuzzyLoad = calcServerFuzzyLoad(inputs[i])
// let load = inputs[i].load;
// let veryLow = 0;
// let low = 0;
// let medium = 0;
// let high = 0;
// let veryHigh = 0;

// if (load <= 10) {
//     veryLow = 1;
// } else if (load > 10 && load <= 30) {
//     veryLow = (30 - load) / 20;
//     low = (load - 10) / 20;
// } else if (load > 30 && load <= 50) {
//     low = (50 - load) / 20;
//     medium = (load - 30) / 20;
// } else if (load > 50 && load <= 70) {
//     medium = (70 - load) / 20;
//     high = (load - 50) / 20;
// } else if (load > 70 && load <= 90) {
//     high = (90 - load) / 20;
//     veryHigh = (load - 70) / 20;
// } else if (load > 90) {
//     veryHigh = 1;
// }

// inputs[i].fuzzyLoad = [veryLow, low, medium, high, veryHigh];
//     }

//     return inputs;
// }

export function calcClusterCapacityAndUsage(cluster: Cluster): Cluster {
  let servers = cluster.servers;

  let totalRamUsage = 0;
  let totalCpuUsage = 0;
  let totalHardUsage = 0;

  let totalRamCapacity = 0;
  let totalCpuCapacity = 0;
  let totalHardCapacity = 0;

  // for (let i = 0; i < servers.length; i++) {
  //     totalRamCapacity = totalRamCapacity + servers[i].ramCapacity;
  //     totalCpuCapacity = totalCpuCapacity + servers[i].cpuCapacity;
  //     totalHardCapacity = totalHardCapacity + servers[i].hardCapacity;

  //     totalRamUsage = totalRamUsage + servers[i].ramUsage;
  //     totalCpuUsage = totalCpuUsage + servers[i].cpuUsage;
  //     totalHardUsage = totalHardUsage + servers[i].hardUsage;
  // }
  for (let key in servers) {
    totalRamCapacity = totalRamCapacity + servers[key].ram;
    totalCpuCapacity = totalCpuCapacity + servers[key].cpu;
    totalHardCapacity = totalHardCapacity + servers[key].hard;

    totalRamUsage = totalRamUsage + servers[key].ramUsage;
    totalCpuUsage = totalCpuUsage + servers[key].cpuUsage;
    totalHardUsage = totalHardUsage + servers[key].hardUsage;
  }

  cluster.ramCapacity = totalRamCapacity;
  cluster.cpuCapacity = totalCpuCapacity;
  cluster.hardCapacity = totalHardCapacity;

  cluster.ramUsage = totalRamUsage;
  cluster.cpuUsage = totalCpuUsage;
  cluster.hardUsage = totalHardUsage;

  return cluster;
}

export function calcClusterUtilization(cluster: Cluster): Cluster {
  cluster.ramUtilization = (cluster.ramUsage / cluster.ramCapacity) * 100;
  cluster.cpuUtilization = (cluster.cpuUsage / cluster.cpuCapacity) * 100;
  cluster.hardUtilization = (cluster.hardUsage / cluster.hardCapacity) * 100;

  return cluster;
}

export function calcClusterLoad(cluster: Cluster): Cluster {
  if (cluster.hardUtilization >= 100) {
    cluster.load = 100;
  } else {
    cluster.load = Math.max(cluster.cpuUtilization, cluster.ramUtilization);
  }
  return cluster;
}

export function fuzzifyCluster(cluster: Cluster): Cluster {
  let load = cluster.load;
  let veryLow = 0;
  let low = 0;
  let medium = 0;
  let high = 0;
  let veryHigh = 0;

  if (load <= 10) {
    veryLow = 1;
  } else if (load > 10 && load <= 30) {
    veryLow = (30 - load) / 20;
    low = (load - 10) / 20;
  } else if (load > 30 && load <= 50) {
    low = (50 - load) / 20;
    medium = (load - 30) / 20;
  } else if (load > 50 && load <= 70) {
    medium = (70 - load) / 20;
    high = (load - 50) / 20;
  } else if (load > 70 && load <= 90) {
    high = (90 - load) / 20;
    veryHigh = (load - 70) / 20;
  } else if (load > 90) {
    veryHigh = 1;
  }

  cluster.fuzzyLoad = [veryLow, low, medium, high, veryHigh];

  return cluster;
}

// export function averageFuzzyLoad ()

export function calcServerFuzzyLoad(server: Server): Server {
  let load = server.load;
  let veryLow = 0;
  let low = 0;
  let medium = 0;
  let high = 0;
  let veryHigh = 0;

  if (load <= 10) {
    veryLow = 1;
  } else if (load > 10 && load <= 30) {
    veryLow = (30 - load) / 20;
    low = (load - 10) / 20;
  } else if (load > 30 && load <= 50) {
    low = (50 - load) / 20;
    medium = (load - 30) / 20;
  } else if (load > 50 && load <= 70) {
    medium = (70 - load) / 20;
    high = (load - 50) / 20;
  } else if (load > 70 && load <= 90) {
    high = (90 - load) / 20;
    veryHigh = (load - 70) / 20;
  } else if (load > 90) {
    veryHigh = 1;
  }

  server.fuzzyLoad = [veryLow, low, medium, high, veryHigh];
  return server;
}

export function calcFuzzyOutput2(cluster: Cluster): Cluster {
  let average = cluster.fuzzyLoad;
  let servers = cluster.servers;
  // let loadMinusAverage;
  for (let key in servers) {
    let load = servers[key].fuzzyLoad;
    let loadMinusAverage : fuzzyLoad = [0, 0, 0, 0, 0];
    for (let i = 0; i < load.length; i++) {
      // loadMinusAverage.push(load[i] - average[i]);
      loadMinusAverage[i] = load[i] - average[i];
    }
    servers[key].loadMinusAverage = loadMinusAverage;
  }
  for (let key in servers) {
    let r = 0;
    let n = 0;
    let s = 0;
    for (let i = 0; i < servers[key].loadMinusAverage.length; i++) {

      if (servers[key].loadMinusAverage[i] < 0) {
        servers[key].fuzzyOutput = loadIsMore(servers[key].loadMinusAverage);
        break;
      } else if (servers[key].loadMinusAverage[i] > 0) {
        servers[key].fuzzyOutput = loadIsLess(servers[key].loadMinusAverage);
        break;
      }
    }


  }
  return cluster;
}

function loadIsMore(input): fuzzyOutput {
  let s = 0;
  for(let i = 0; i < input.length; i++) {
    if(input[i] > 0) {
      s = s + input[i]
    }
  }
  return [0, 1 - s, s]
}

function loadIsLess(input): fuzzyOutput {
  let r = 0;
  for(let i = 0; i < input.length; i++) {
    if(input[i] > 0) {
      r = r + input[i]
    }
  }
  return [r, 1 - r, 0]
}

export function calcFuzzyOutput(cluster: Cluster): Cluster {
  let averageLoad = cluster.fuzzyLoad;
  let servers = cluster.servers;

  for (let key in servers) {
    servers[key].fuzzyOutput = [0, 1, 0];
    let load = servers[key].fuzzyLoad;
    let length = averageLoad.length;

    if (load[length - 1] === 1 && averageLoad[length - 1] === 0) {
      servers[key].fuzzyOutput = [1, 0, 0];
      // console.log(1);
    } else if (load[length - 1] === 0 && averageLoad[length - 1] === 1) {
      servers[key].fuzzyOutput = [0, 0, 1];
    } else if (load[length - 1] === 1 && averageLoad[length - 1] === 1) {
      servers[key].fuzzyOutput = [0, 1, 0];
    }

    for (let j = 0; j < length - 1; j++) {
      if (load[j] === 1 && averageLoad[j] === 0) {
        servers[key].fuzzyOutput = [1, 0, 0];
        break;
      } else if (load[j] === 0 && averageLoad[j] === 1) {
        servers[key].fuzzyOutput = [0, 0, 1];
        break;
      } else if (load[j] === 1 && averageLoad[j] === 1) {
        servers[key].fuzzyOutput = [0, 1, 0];
        break;
      } else if (averageLoad[j] === 0 && bZO(load[j])) {
        let s = 0;
        let n = Math.min(load[j + 1], averageLoad[j + 1]);
        let r = 1 - n;
        servers[key].fuzzyOutput = [r, n, s];
        break;
      } else if (load[j] === 0 && bZO(averageLoad[j])) {
        let r = 0;
        let n = Math.min(load[j + 1], averageLoad[j + 1]);
        let s = 1 - n;
        servers[key].fuzzyOutput = [r, n, s];
        break;
      } else if (
        bZO(load[j]) &&
        averageLoad[j] === 0 &&
        averageLoad[j + 1] === 0
      ) {
        servers[key].fuzzyOutput = [1, 0, 0];
        break;
      } else if (bZO(averageLoad[j]) && load[j] === 0 && load[j + 1] === 0) {
        servers[key].fuzzyOutput = [0, 0, 1];
        break;
      } else if (
        //   bZO(load[j]) &&
        //   bZO(load[j + 1]) &&
        //   averageLoad[j] === 0 &&
        //   bZO(averageLoad[j + 1])
        // ) {
        //   let s = 0;
        //   let n = Math.min(load[j + 1], averageLoad[j + 1]);
        //   let r = 1 - n;
        //   servers[key].fuzzyOutput = [r, n, s];
        //   break;
        load[j] > 0 &&
        load[j + 1] === 0 &&
        averageLoad[j] > 0 &&
        averageLoad[j + 1] > 0
      ) {
        let s = 0;
        let n = Math.min(load[j + 1], averageLoad[j + 1]);
        let r = 1 - n;
        servers[key].fuzzyOutput = [r, n, s];
        break;
      } else if (
        // load[j] === 0 &&
        // bZO(load[j + 1]) &&
        // bZO(averageLoad[j + 1]) &&
        // bZO(averageLoad[j])
        averageLoad[j] > 0 &&
        averageLoad[j + 1] === 0 &&
        load[j] > 0 &&
        load[j + 1] > 0
      ) {
        let r = 0;
        let n = Math.min(load[j + 1], averageLoad[j + 1]);
        let s = 1 - n;
        servers[key].fuzzyOutput = [r, n, s];
        break;
      } else if (
        bZO(load[j]) &&
        bZO(load[j + 1]) &&
        bZO(averageLoad[j + 1]) &&
        bZO(averageLoad[j])
      ) {
        if (load[j + 1] > averageLoad[j + 1]) {
          let r = 0;
          let n = Math.max(
            Math.min(averageLoad[j], load[j]),
            Math.min(averageLoad[j + 1], load[j + 1])
          );
          let s = 1 - n;
          servers[key].fuzzyOutput = [r, n, s];
          break;
        } else if (load[j + 1] < averageLoad[j + 1]) {
          let s = 0;
          let n = Math.max(
            Math.min(averageLoad[j], load[j]),
            Math.min(averageLoad[j + 1], load[j + 1])
          );
          let r = 1 - n;
          servers[key].fuzzyOutput = [r, n, s];
          break;
        } else {
          servers[key].fuzzyOutput = [0, 1, 0];
        }
      }
    }
  }

  //   for (let i = 0; i < servers.length; i++) {
  //     servers[i].fuzzyOutput = [0, 1, 0];
  //     let load = servers[i].fuzzyLoad;
  //     let length = averageLoad.length;

  //     if (load[length - 1] === 1 && averageLoad[length - 1] === 0) {
  //       servers[i].fuzzyOutput = [1, 0, 0];
  //       console.log(1);
  //     } else if (load[length - 1] === 0 && averageLoad[length - 1] === 1) {
  //       servers[i].fuzzyOutput = [0, 0, 1];
  //     } else if (load[length - 1] === 1 && averageLoad[length - 1] === 1) {
  //       servers[i].fuzzyOutput = [0, 1, 0];
  //     }

  //     for (let j = 0; j < length - 1; j++) {
  //       if (load[j] === 1 && averageLoad[j] === 0) {
  //         servers[i].fuzzyOutput = [1, 0, 0];
  //         break;
  //       } else if (load[j] === 0 && averageLoad[j] === 1) {
  //         servers[i].fuzzyOutput = [0, 0, 1];
  //         break;
  //       } else if (load[j] === 1 && averageLoad[j] === 1) {
  //         servers[i].fuzzyOutput = [0, 1, 0];
  //         break;
  //       } else if (
  //         bZO(load[j]) &&
  //         averageLoad[j] === 0 &&
  //         averageLoad[j + 1] === 0
  //       ) {
  //         servers[i].fuzzyOutput = [1, 0, 0];
  //         break;
  //       } else if (bZO(averageLoad[j]) && load[j] === 0 && load[j + 1] === 0) {
  //         servers[i].fuzzyOutput = [0, 0, 1];
  //         break;
  //       } else if (
  //         bZO(load[j]) &&
  //         bZO(load[j + 1]) &&
  //         averageLoad[j] === 0 &&
  //         bZO(averageLoad[j + 1])
  //       ) {
  //         let s = 0;
  //         let n = Math.min(load[j + 1], averageLoad[j + 1]);
  //         let r = 1 - n;
  //         servers[i].fuzzyOutput = [r, n, s];
  //         break;
  //       } else if (
  //         load[j] === 0 &&
  //         bZO(load[j + 1]) &&
  //         bZO(averageLoad[j + 1]) &&
  //         bZO(averageLoad[j])
  //       ) {
  //         console.log("hello");
  //         let r = 0;
  //         let n = Math.min(load[j + 1], averageLoad[j + 1]);
  //         let s = 1 - n;
  //         servers[i].fuzzyOutput = [r, n, s];
  //         break;
  //       } else if (
  //         bZO(load[j]) &&
  //         bZO(load[j + 1]) &&
  //         bZO(averageLoad[j + 1]) &&
  //         bZO(averageLoad[j])
  //       ) {
  //         if (load[j + 1] > averageLoad[j + 1]) {
  //           let r = 0;
  //           let n = Math.max(
  //             Math.min(averageLoad[j], load[j]),
  //             Math.min(averageLoad[j + 1], load[j + 1])
  //           );
  //           let s = 1 - n;
  //           servers[i].fuzzyOutput = [r, n, s];
  //           break;
  //         } else if (load[j + 1] < averageLoad[j + 1]) {
  //           let s = 0;
  //           let n = Math.max(
  //             Math.min(averageLoad[j], load[j]),
  //             Math.min(averageLoad[j + 1], load[j + 1])
  //           );
  //           let r = 1 - n;
  //           servers[i].fuzzyOutput = [r, n, s];
  //           break;
  //         } else {
  //           servers[i].fuzzyOutput = [0, 1, 0];
  //         }
  //       }
  //     }
  //   }
  cluster.servers = servers;
  return cluster;
}

export function calcOutput(cluster: Cluster): Cluster {
  cluster.active = false;
  //   cluster.status = Array(cluster.servers.length).fill(0);
  let servers = cluster.servers;
  let maxSender = 0;
  let maxReceiver = 0;
  let senderIndex = 0;
  let receiverIndex = 0;

  let senderKey = "";
  let receiverKey = "";


  for (let key in servers) {
    servers[key].status = 0;
    if (servers[key].hasOwnProperty("fuzzyOutput")) {
      if (servers[key].fuzzyOutput[0] > maxReceiver) {
        maxReceiver = servers[key].fuzzyOutput[0];
        receiverKey = key;
      }
      if (servers[key].fuzzyOutput[2] > maxSender) {
        maxSender = servers[key].fuzzyOutput[2];
        senderKey = key;
      }
    } else {
      break;
    }

  }

  //   for (let i = 0; i < servers.length; i++) {
  //     servers[i].status = 0;
  //     if (servers[i].fuzzyOutput[0] > maxReceiver) {
  //       maxReceiver = servers[i].fuzzyOutput[0];
  //       receiverIndex = i;
  //     }
  //     if (servers[i].fuzzyOutput[2] > maxSender) {
  //       maxSender = servers[i].fuzzyOutput[2];
  //       senderIndex = i;
  //     }
  //   }
  // console.log(cluster);

  if (
    maxSender < 1 - cluster.sens &&
    maxReceiver < 1 - cluster.sens
    //  ||(maxSender + maxReceiver) < 1
  ) {
    // console.log(maxSender + maxReceiver);
    // console.log("hello");
    return cluster;
  } else {
    // if (typeof Worker !== 'undefined')
    if (typeof servers[senderKey] === 'undefined' || servers[receiverKey] === 'undefined') {
      return cluster;
    } else {
      servers[senderKey].status = 1;
      servers[receiverKey].status = -1;
      cluster.senderKey = senderKey;
      cluster.receiverKey = receiverKey;
      cluster.active = true;
    }


    // let clusterStatus: Array<status> = [];

    // for (let i = 0; i < servers.length; i++) {
    //   if (i === senderIndex) {
    //     clusterStatus.push(1);
    //   } else if (i === receiverIndex) {
    //     clusterStatus.push(-1);
    //   } else {
    //     clusterStatus.push(0);
    //   }
    // }

    // cluster.status = clusterStatus;

    // for (let i = 0; i < servers.length; i++) {
    //     if (servers[i].fuzzyOutput[0] === 1) {
    //         rIndex = i;
    //         break;
    //     }
    // }
    // for (let i = 0; i < servers.length; i++) {
    //     if (servers[i].fuzzyOutput[2] === 1) {
    //         sIndex = i;
    //         break;
    //     }
    // }
    // if (rIndex === -1) {
    //     console.log('no receiver')
    // }
    // if (sIndex === -1) {
    //     console.log('no sender');
    // }

    // cluster.servers[rIndex].status = -1;
    // cluster.servers[sIndex].status = 1;

    cluster.servers = servers;

    return cluster;
  }
}

export function bZO(input: number): boolean {
  if (input > 0 && input < 1) {
    return true;
  } else {
    return false;
  }
}

// let cluster: Cluster = {
//   servers: [
//     {
//       ramCapacity: 2000,
//       cpuCapacity: 200,
//       hardCapacity: 500000,
//       clients: []
//     },
//     {
//       ramCapacity: 2000,
//       cpuCapacity: 200,
//       hardCapacity: 500000,
//       clients: []
//     },
//     {
//       ramCapacity: 2000,
//       cpuCapacity: 200,
//       hardCapacity: 500000,
//       clients: []
//     },
//     {
//       ramCapacity: 2000,
//       cpuCapacity: 200,
//       hardCapacity: 500000,
//       clients: []
//     }
//   ],
//   ramCapacity: 0,
//   cpuCapacity: 0,
//   hardCapacity: 0,

//   ramUsage: 0,
//   cpuUsage: 0,
//   hardUsage: 0,

//   ramUtilization: 0,
//   cpuUtilization: 0,
//   hardUtilization: 0,

//   status: []
// };

// let sampleClient: Client = {
//   ramUsage: 15,
//   cpuUsage: 1,
//   hardUsage: 80
// };

// function polulateCluster(cluster: Cluster): Cluster {
//   for (let i = 0; i < 90; i++) {
//     cluster.servers[0] = addClient(sampleClient, cluster.servers[0]);
//   }
//   for (let i = 0; i < 50; i++) {
//     cluster.servers[1] = addClient(sampleClient, cluster.servers[1]);
//   }
//   for (let i = 0; i < 24; i++) {
//     cluster.servers[2] = addClient(sampleClient, cluster.servers[2]);
//   }
//   return cluster;
// }

// function start() {
//   polulateCluster(cluster);
//   console.log(cluster);

//   if (cluster.hasOwnProperty('servers')) {
//     for (let key in cluster.servers) {
//       calServerUtilization(cluster.servers[key]);
//       calServerLoad(cluster.servers[key]);
//       calcServerFuzzyLoad(cluster.servers[key]);
//     }
//   } else {
//     return;
//   }

// //   if (this.info.hasOwnProperty("clients")) {
// //     clients = this.info.clients;
// //   }

// //   for (let key in this.clusterData.servers) {
// //     console.log(key, this.clusterData.servers[key]);
// //   }

// //   for (let i = 0; i < cluster.servers.length; i++) {
// //     calServerUtilization(cluster.servers[i]);
// //     // cluster.servers[i] = calServerLoad(cluster.servers[i])
// //     calServerLoad(cluster.servers[i]);
// //     calcServerFuzzyLoad(cluster.servers[i]);
// //   }
//   console.log(cluster);

//   calcClusterCapacityAndUsage(cluster);
//   console.log(cluster);

//   calcClusterUtilization(cluster);
//   console.log(cluster);

//   calcClusterLoad(cluster);
//   console.log(cluster);

//   fuzzifyCluster(cluster);
//   console.log(cluster);

//   calcFuzzyOutput(cluster);
//   console.log(cluster);

//   calcOutput(cluster);
//   console.log(cluster);

//   if (cluster.active) {
//     let keys = Object.keys(cluster.servers[cluster.senderKey].clients);
//     let sendingItemId = keys[keys.length - 1];
//     let sendingItem = cluster.servers[cluster.senderKey].clients[sendingItemId];
//     delete cluster.servers[cluster.senderKey].clients[sendingItemId];
//     cluster.servers[cluster.receiverKey].clients[sendingItemId] = sendingItem;
//   }

//   console.log(cluster);
// }

// console.log(cluster)
// start();
