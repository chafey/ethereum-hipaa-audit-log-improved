import { Meteor } from 'meteor/meteor';
import './accounts-ethereum/register.js';
import { Random } from 'meteor/random';

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

Meteor.publish('patients', function() {
  if(this.userId) {
    return Patients.find();
  }
})

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

  if(Patients.find().count() === 0) {
    var fakeNames = [
      'Reed Duckworth',
      'Leanna Balogh',
      'Ricardo Lefler',
      'Shakia Earlywine',
      'Lucila Britten',
      'Joselyn Flanery',
      'Serina Mehr',
      'Wallace Brodsky',
      'Machelle Emig',
      'Loura Fitzmaurice',
      'Rocco Traina',
      'Frederic Tolliver',
      'Lou Brustv',
      'Wyatt Rozar',
      'Lianne Wilbur',
      'Royce Pendleton',
      'Jimmie Funk',
      'Hettie Sjoberg',
      'Lynell Holloway',
      'Nona Lucius'];
    fakeNames.forEach((fakeName)=> {
      Patients.insert({
        name: fakeName,
        mrn: Random.id(),
        dob: new Date(Math.floor(Math.random() * 1486496753081))
      });
    });
  }
});
