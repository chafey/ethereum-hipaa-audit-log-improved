import './main.html';
import './accounts-ethereum/login.js';

import { Template } from 'meteor/templating';

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

    // Meteor.subscribe('patients');
    var subscription = {
      // criteria: "/Patient?identifier=http://acme.org/patient/123",
      criteria: "/Patient",
      status: 'active',
      channel: { 
        type: 'websocket',
        endpoint: Meteor.absoluteUrl()    
      }
    }
    Meteor.subscribe("patients", subscription);
});
