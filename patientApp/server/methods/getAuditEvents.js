
import web3 from '../web3.js';

//var Patient = web3.eth.contract(patient.abi);

Meteor.methods({
  'getAuditEvents' : function(patientAddress, userAddress)  {
    console.log(this.userId);
    console.log(patientAddress, userAddress);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }

    var filter = web3.eth.filter({
      address: patientAddress,
      fromBlock: 0
    });


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
