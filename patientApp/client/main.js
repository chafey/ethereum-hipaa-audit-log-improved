import { Template } from 'meteor/templating';

import './main.html';
import './accounts-ethereum/login.js';

Template.main.helpers({
  metamask() {
    if(typeof mist === 'undefined' && web3) {
      return true;
    }
    return false;
  },
  userRegistered() {
    return Meteor.user().userRegistered;
  }
});

Tracker.autorun(function () {
    Meteor.subscribe("userData");
});
