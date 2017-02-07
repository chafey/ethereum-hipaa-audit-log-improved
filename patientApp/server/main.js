import { Meteor } from 'meteor/meteor';
import './accounts-ethereum/register.js';

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {
          'userRegistered': 1,
          'permission' : 1,
          'firstName' : 1,
          'lastName' : 1
        }
      });
});


Meteor.startup(() => {
  // code to run on server at startup
  if(RegistrationCodes.find().count() === 0) {
    RegistrationCodes.insert({
      code: 'H37o981912MA3vb',
      firstName: 'Chris',
      lastName: 'Hafey',
      permission: 'admin'
    });
    RegistrationCodes.insert({
      code: 'M8XzRY47RZOx1HI',
      firstName: 'Jones',
      lastName: 'Bob',
      permission: 'clinician'
    });

  }
});
