import loginWithEthereum from './loginWithEthereum.js';

Template.logon.helpers({
  address() {
    return web3.eth.accounts[0];
  }
})

Template.logon.events({
  'click #login'(event, instance) {
    //Meteor.loginWithEthereum();
    loginWithEthereum('', (error) => {
      if(error) {
        console.log(error);
      } else {
        FlowRouter.go('home');
      }
    });

  },
  'click #register'(event, instance) {
    FlowRouter.go('register');
  },
  'click #requestAccess'(event, instance) {
    FlowRouter.go('requestAccess');
  },

});
