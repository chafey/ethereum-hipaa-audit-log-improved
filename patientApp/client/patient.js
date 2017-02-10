
Template.patient.events({
  'click tr'(event, instance) {
    //console.log('click', instance);
    Meteor.call('logPatientAccessed', instance.data._id);
    FlowRouter.go('/viewReport/' + instance.data._id);
  },

})
