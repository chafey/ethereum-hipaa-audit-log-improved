import { Meteor } from 'meteor/meteor';
import './accounts-ethereum/register.js';
import { Random } from 'meteor/random';
import createPatient from './createPatient.js';
import harvestTransactions from './harvestTransactions.js';
import web3 from './web3.js'

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {
          'userRegistered': 1,
          'permission' : 1,
          'firstName' : 1,
          'lastName' : 1,
          'services.ethereum.address' : 1
        }
      });
});

Meteor.publish('patients', function() {
  if(this.userId) {
    return Patients.find();
  }
})

Meteor.startup(() => {
  harvestTransactions.start();

  /*var filter = web3.eth.filter({
    address: '0x5061f6f976924e91ae067732055d45cd6849e1bb',
    fromBlock: 0
  });
  filter.get(function(err,result) {
    console.log('get', result);
  });
  */


/*

  var patientAccessedTopic = web3.sha3('PatientAccessed(address)');

  // get all events for a given patient
  var filter = web3.eth.filter({
    address: '0x5061f6f976924e91ae067732055d45cd6849e1bb',
    fromBlock: 0
  });
  filter.watch(function(err, result) {
    console.log('watch patient', err, result);
  });


  // get all events for a given user
  var filter2 = web3.eth.filter({
    topics: [
      null,//"0x5e2510585e36c769ee0aa8d684b60b5f6efca424bb7cd9b1bab30f76120789e0",
      "0x0000000000000000000000005dfe021f45f00ae83b0aa963be44a1310a782fcc"
      //"0x0000000000000000000000009332827e1240c5b9ba035a18fafbb0c7794a0c31"
      ],
    fromBlock: 0});
  filter2.watch(function(err, result) {
    console.log('watch user', err, result);
  });

  // get PatientAccessed events for a given user
  var filter3 = web3.eth.filter({
    topics: [
      patientAccessedTopic,
      "0x0000000000000000000000009332827e1240c5b9ba035a18fafbb0c7794a0c31"
    ],
    fromBlock: 0
  });
  filter3.watch(function(err, result) {
    console.log('watch user', err, result);
  });
*/

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
  //Patients.remove({});


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
      createPatient({
          name: fakeName,
          mrn: Random.id(),
          dob: new Date(Math.floor(Math.random() * 1486496753081))
      })
    });
  }
});
