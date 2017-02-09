Template.register.events({
  'submit'(event, instance) {
    event.preventDefault();
    const regCode = event.target.regCode.value;
    Meteor.call('register', regCode, (error, result)=> {
      console.log(error, result);
      if(result) {
        // navigate to
      } else {
        messagebox(error);
      }
    });
  },
  'click #logout'() {
    Meteor.logout();
  }
});
