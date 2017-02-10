
Template.requestAccess.events({
  'submit'(event, instance) {
    event.preventDefault();
    var request = {
      email : event.target.email.value,
      npi : event.target.npi.value,
      firstName : event.target.firstName.value,
      lastName : event.target.lastName.value,
      phoneNumber : event.target.phoneNumber.value,
    }
    console.log(request);
    Meteor.call('requestAccess', request, function(error,result) {
      if(error) {
        console.log(error);
      } else {
        alert('Thank you, we will be contacting you soon.')
        FlowRouter.go('home');
      }
    })
  },
  'click #cancel'() {
    FlowRouter.go('home');
  }
});
