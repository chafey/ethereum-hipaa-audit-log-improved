
import patient from '../patient';
import web3 from '../web3.js';

//var Patient = web3.eth.contract(patient.abi);

Meteor.methods({
  'logPatientAccessed' : function(id)  {
    console.log(this.userId);
    console.log(id);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }
    // look up this patient
    var patientRecord = Patients.findOne({_id : id});
    if(patientRecord) {
      console.log(patientRecord);
      //var patient = Patient.at(patientRecord.contractAddress);
      var user = Meteor.users.findOne({_id: this.userId});
      var addr = user.services.ethereum.address;
      console.log(addr);
      patient.logAccess(patientRecord.contractAddress, addr);
      return "success";
    } else {
      throw new Meteor.Error("invalidPatient", "Invalid patient id.");
    }
  }
});
