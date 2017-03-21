

Patients.after.insert(function (userId, doc) {
  console.log('Patients.after.insert');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
Patients.after.update(function (userId, doc) {
  console.log('Patients.after.update');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
Patients.after.remove(function (userId, doc) {
  console.log('Patients.after.remove');
  console.log('We should probably write to the Etherium ledger here...');
  // ...

});
