Meteor.methods({
  'register' : function(regCode)  {
    console.log(this.userId);
    console.log(regCode);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }
    // look up this registration code
    var code = RegistrationCodes.findOne({code : regCode});
    if(code) {
      console.log(code);
      Meteor.users.update({_id: this.userId},
        {$set: {
          userRegistered : true,
          permission: code.permission,
          firstName: code.firstName,
          lastName: code.lastName
        }});
      return "success";
    } else {
      throw new Meteor.Error("invalidCode", "Invalid registration code.");
    }
  }
});
