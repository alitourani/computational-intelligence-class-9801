/// <reference lib="webworker" />
import {
  Cluster,
  Server,
  Client,
  calServerUtilization,
  calServerLoad,
  calcServerFuzzyLoad,
  calcClusterCapacityAndUsage,
  calcClusterUtilization,
  calcClusterLoad,
  fuzzifyCluster,
  calcFuzzyOutput,
  calcOutput,
  addClient,
  calcFuzzyOutput2
} from "../modules";

addEventListener("message", ({ data }) => {
  let cluster: Cluster = data;

  // console.log(data);
  if (cluster.hasOwnProperty("servers")) {
    for (let key in cluster.servers) {
      calServerUtilization(cluster.servers[key]);
      calServerLoad(cluster.servers[key]);
      calcServerFuzzyLoad(cluster.servers[key]);
    }
  } else {
    return;
  }

  // for (let i = 0; i < cluster.servers.length; i++) {
  //   calServerUtilization(cluster.servers[i]);
  //   // cluster.servers[i] = calServerLoad(cluster.servers[i])
  //   calServerLoad(cluster.servers[i]);
  //   calcServerFuzzyLoad(cluster.servers[i]);
  // }
  // console.log(cluster);

  calcClusterCapacityAndUsage(cluster);
  // console.log(cluster);

  calcClusterUtilization(cluster);
  // console.log(cluster);

  calcClusterLoad(cluster);
  // console.log(cluster);

  fuzzifyCluster(cluster);
  // console.log(cluster);

  calcFuzzyOutput2(cluster);
  // console.log(cluster);

  calcOutput(cluster);
  // console.log(cluster);

  if (cluster.active) {
    let keys = Object.keys(cluster.servers[cluster.senderKey].clients);
    let sendingItemId = keys[keys.length - 1];
    let sendingItem = cluster.servers[cluster.senderKey].clients[sendingItemId];
    delete cluster.servers[cluster.senderKey].clients[sendingItemId];
    cluster.servers[cluster.receiverKey].clients[sendingItemId] = sendingItem;
  }

  // console.log(cluster);

  // const response = `worker response to ${data}`;
  setTimeout(function() {
    postMessage(cluster);
  }, cluster.delay);
  // postMessage(cluster);
});
