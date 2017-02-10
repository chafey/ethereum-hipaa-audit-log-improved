Template.addPatient.events({
  'submit'(event, instance) {
    event.preventDefault();
    var patient = {
      name: event.target.name.value,
      mrn: event.target.mrn.value,
      dob: event.target.dob.value
    }
    console.log(patient);
    Meteor.call('addPatient', patient, function(err,res) {
      if(!err) {
        FlowRouter.go('patients');
      }
    });
  },
  'click #cancel'(event, instance) {
    event.preventDefault();
    FlowRouter.go('patients');
  }
});
