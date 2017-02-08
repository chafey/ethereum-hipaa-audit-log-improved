import patient from './patient';

export default function(patientRecord) {

  // insert patient record in db
  var id = Patients.insert(patientRecord);


  // Create patient contract on blockchain
  // create blockchain contract
  var p = patient.new();

  p.then((transactionHash) => {
    console.log('transactionHash:', transactionHash);
    Patients.update(
      {
        _id : id
      },{
        $set: {
          transactionHash: transactionHash
        }
      });
  });

}
