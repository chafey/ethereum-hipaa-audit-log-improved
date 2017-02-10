Template.patients.helpers({
  patients() {
    return Patients.find();
  }
});

Template.patients.events({
  'click button'(event, instance) {
    console.log('click', instance);
    FlowRouter.go('addPatient');
  }
});
