Template.viewReport.helpers({

});
Template.viewReport.events({
  'click #close'(event, instance) {
    event.preventDefault();
    //console.log(instance);
    FlowRouter.go('patients');
  }
});
