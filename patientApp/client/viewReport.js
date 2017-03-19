Template.viewReport.helpers({
  patient: function(){
    console.log('viewReport', FlowRouter)
    return Patients.findOne({_id: FlowRouter._current.params.id});
  }
});
Template.viewReport.events({
  'click #close'(event, instance) {
    event.preventDefault();
    //console.log(instance);
    FlowRouter.go('patients');
  }
});
