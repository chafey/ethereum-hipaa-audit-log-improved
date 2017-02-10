import loginWithEthereum from './loginWithEthereum.js';

Template.register.events({
  'submit'(event, instance) {
    event.preventDefault();
    const regCode = event.target.regCode.value;
    loginWithEthereum(regCode, (error) => {
      if(error) {
        console.log(error);
      } else {
        FlowRouter.go('home');
      }
    });
    /*Meteor.call('register', regCode, (error, result)=> {
    });
    */
  },
  'click #cancel'() {
    FlowRouter.go('home');
  }
});
