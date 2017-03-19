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
        $push: {
          identifier: {
          'use' : 'transactionHash',
          'type' : {
            text: 'Transaction Hash',
            'coding' : [
              {
                'system' : 'https://solidity.readthedocs.io/en/develop/',
                'code' : 'ETH'
              }
            ]
          },
          'value' : transactionHash,
          'period' : {}
          }
        }
      });
  });

}
