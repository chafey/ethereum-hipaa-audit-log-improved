Template.ensureLoggedInAndRegistered.helpers({
  metamask() {
    if(typeof mist === 'undefined' && web3) {
      return true;
    }
    return false;
  },
  userRegistered() {
    return Meteor.user().userRegistered;
  },
  initialized() {
    return Accounts.loginServicesConfigured();
  }
});
