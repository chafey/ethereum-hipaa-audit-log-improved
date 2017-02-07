Template.navbar.helpers({
  activeListClass(page) {
    const active = ActiveRoute.name(page);
    return active && 'active';
  },
  name() {
    return Meteor.user().firstName + ' ' + Meteor.user().lastName;
  }
});

Template.navbar.events({
  'click #logout'(event,instance) {
    Meteor.logout();
  }
})
