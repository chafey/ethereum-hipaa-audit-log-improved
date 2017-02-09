
import web3 from '../web3.js';

var patientAccessedTopic = web3.sha3('PatientAccessed(address)');

function makeFilter(patientAddress, userAddress) {
  // filter by patient (all users))
  if(!userAddress.length && patientAddress.length) {
    return web3.eth.filter({
      address: patientAddress,
      fromBlock: 0
    });
  }
  // filter by user (all patients)
  if(userAddress.length && !patientAddress.length) {
    return web3.eth.filter({
      topics: [
        patientAccessedTopic,
        "0x000000000000000000000000" + userAddress.substr(2)
        ],
      fromBlock: 0});
  }
  // filter by patient and user
  if(userAddress.length && patientAddress.length) {
    return web3.eth.filter({
          address: patientAddress,
          topics: [
            patientAccessedTopic,
            "0x000000000000000000000000" + userAddress.substr(2)
            ],
          fromBlock: 0});
  }
  // return everything! (all users and patients)
  return web3.eth.filter({
        topics: [
          patientAccessedTopic,
          ],
        fromBlock: 0});
}

Meteor.methods({
  'getAuditEvents' : function(patientAddress, userAddress)  {
    //console.log(this.userId);
    //console.log(patientAddress, userAddress);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }

    var filter = makeFilter(patientAddress, userAddress);

    var filterGet = Meteor.wrapAsync(filter.get, filter);
    //console.log(filterGet);
    try {
      var result = filterGet();
      //console.log(result);
      result.forEach(function(tx) {
        var block = web3.eth.getBlock(tx.blockNumber);
        tx.timestamp = new Date(block.timestamp*1000);
      })
      return result;
    }
    catch(e) {
      console.log('error', e);
      throw new Meteor.Error("error", e);
    }
  }
});
