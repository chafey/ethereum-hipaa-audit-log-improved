Meteor.methods({
  'requestAccess' : function(request)  {
    console.log(this.userId);
    console.log(request);
    if(this.userId !== null) {
      throw new Meteor.Error("logged-in", "The user must be logged out.");
    }
    AccessRequests.insert(request);
  }
});
