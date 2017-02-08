import web3 from './web3.js';

var intervalId;

function start() {
  console.log('harvestTransactions.start');

  intervalId = Meteor.setInterval(() => {
    //console.log('harvestTransactions - harvesting');
    var patients = Patients.find({
      contractAddress : {$exists: false}
    });
    console.log('------');
    patients.forEach((patient) => {
      console.log(patient._id);
      if(patient.transactionHash) {
        var transactionReceipt = web3.eth.getTransactionReceipt(patient.transactionHash);
        console.log(transactionReceipt);
        if(transactionReceipt !== null) {
          Patients.update({
            _id : patient._id
          }, {
            $set : {
              contractAddress: transactionReceipt.contractAddress
            }
          })
        }
      } else {
        console.log('skipping....');
      }
    });
  }, 1000);
}

function end() {
}

export default {
  start: start,
  end: end
}
