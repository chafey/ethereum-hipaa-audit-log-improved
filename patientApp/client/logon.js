Template.logon.helpers({
  address() {
    return web3.eth.accounts[0];
  }
})

Template.logon.events({
  'click #login'(event, instance) {
    Meteor.loginWithEthereum();
  },
});
