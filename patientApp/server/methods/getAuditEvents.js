
import web3 from '../web3.js';

//var Patient = web3.eth.contract(patient.abi);

function makeFilter(patientAddress, userAddress) {
  if(!userAddress.length && patientAddress.length) {
    return web3.eth.filter({
      address: patientAddress,
      fromBlock: 0
    });
  }
  if(userAddress.length && !patientAddress.length) {
    return web3.eth.filter({
      topics: [
        "0x5e2510585e36c769ee0aa8d684b60b5f6efca424bb7cd9b1bab30f76120789e0",
        "0x000000000000000000000000" + userAddress.substr(2)
        ],
      fromBlock: 0});
  }
  if(userAddress.length && patientAddress.length) {
    return web3.eth.filter({
          address: patientAddress,
          topics: [
            "0x5e2510585e36c769ee0aa8d684b60b5f6efca424bb7cd9b1bab30f76120789e0",
            "0x000000000000000000000000" + userAddress.substr(2)
            ],
          fromBlock: 0});

  }

  return web3.eth.filter({
        topics: [
          "0x5e2510585e36c769ee0aa8d684b60b5f6efca424bb7cd9b1bab30f76120789e0",
          ],
        fromBlock: 0});
}

Meteor.methods({
  'getAuditEvents' : function(patientAddress, userAddress)  {
    console.log(this.userId);
    console.log(patientAddress, userAddress);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }



    var filter = makeFilter(patientAddress, userAddress);


    var filterGet = Meteor.wrapAsync(filter.get, filter);
    console.log(filterGet);
    try {
      var result = filterGet();
      console.log(result);
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
