import createPatient from '../createPatient.js';


Meteor.methods({
  'addPatient' : function(patient)  {
    console.log(this.userId);
    console.log(patient);
    if(this.userId === null) {
      throw new Meteor.Error("logged-out", "The user must be logged in.");
    }
    createPatient(patient);
  }
});
