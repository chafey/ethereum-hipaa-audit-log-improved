// Patients = new Mongo.Collection('Patients');

EthereumAuditLogPatientSchema = new SimpleSchema([
  PatientSchema,
  {
    "transactionHash": {
      "type": String,
      "optional": true
    },
    "contractAddress": {
      "type": String,
      "optional": true
    }
  }
]);
Patients.attachSchema( EthereumAuditLogPatientSchema );