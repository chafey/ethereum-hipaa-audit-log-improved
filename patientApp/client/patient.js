Template.patients.helpers({
  patients() {
    return Patients.find();
  }
});

Template.patient.events({
  'click tr'(event, instance) {
    console.log('click', instance);
  }
})
