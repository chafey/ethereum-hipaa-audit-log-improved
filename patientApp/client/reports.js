AuditEvents = new Mongo.Collection(null);

Template.reports.helpers({
  users() {
    return Meteor.users.find();
  },
  patients() {
    return Patients.find();
  },
  auditEvents() {
    return AuditEvents.find();
  }
})
Template.reports.events({
  'submit'(event, instance) {
    event.preventDefault();
    //console.log(event, instance);
    var patientAddress = $('#selectPatient').val();
    var userAddress = $('#selectUser').val()
    //console.log(patientAddress, userAddress);
    AuditEvents.remove({});
    Meteor.call('getAuditEvents', patientAddress, userAddress, function(err,results) {
      if(results) {
        results.reverse(); // reverse order of array so newest events are showed first
        results.forEach(function(result) {
          var userAddress =  '0x' + result.topics[1].substr(26);
          //console.log('userAddress', userAddress);
          //var user = Meteor.users.findOne({'services.ethereum.address' :userAddress});
          //console.log(user);
          //var userName = user ? user.lastName + ', ' + user.firstName : userAddress;
          var patient = Patients.findOne({'contractAddress' : result.address});
          //console.log(patient);
          var patientName = patient ? patient.name : result.address;
          AuditEvents.insert({
            date: new Date(result.timestamp),
            user: result.userName,
            patient: patientName
          });
        });
      }
    });
  }
});
