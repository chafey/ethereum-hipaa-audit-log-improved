
Template.patient.events({
  'click tr'(event, instance) {
    //console.log('click', instance);
    FlowRouter.go('/viewReport/' + instance.data._id);
  },

})
