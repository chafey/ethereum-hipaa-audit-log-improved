Template.ethereumLogin.helpers({
  address() {
    return web3.eth.accounts[0] + '\ntest';
  },
  ethereum() {
    return web3;
  }
});

Template.ethereumLogin.events({
  'click #logout'(event, instance) {
    Meteor.logout();
  },
  'click #login'(event, instance) {
    Meteor.loginWithEthereum();
  },
});
