import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';

Accounts.registerLoginHandler("ethereum", function(loginRequest) {
  console.log(loginRequest);

  // TODO: Verify signature
  
  var user = Meteor.users.findOne({"services.ethereum.address" : loginRequest.address});
  if(user) {
    return {
      userId: user._id
    }
  }
  var userId = Meteor.users.insert({
    createdAt: new Date(),
    services: {
      ethereum : {
        address: loginRequest.address
      }
    }
  });
  return {
    userId: userId
  }
});
