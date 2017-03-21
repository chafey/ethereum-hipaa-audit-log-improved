# ethereum-hipaa-audit-log-improved

Prototype implementation of a HIPAA audit log using ethereum blockchain

------------------  
Concept

A HIPAA audit log keeps track of which users access which patients at what time.  
Implementing this functionality using blockchain is interesting because:

1. Blockchain is immutable - once an audit record is stored, it cannot be
   removed or changed.   
2. Blockchain is built on public key cryptography.  Users and patients could
   have their own unique public keys on the blockchain that can be referenced
   by the audit log without revealing the actual users identity or any PHI.
3. Blockchain is accessible - the audit records can be easily accessed by
   anonymous users without revealing any PHI

This prototype uses ethereum for the blockchain implementation and has a
smart contract that contains an audit log entry (see contracts/Patient.sol).  

Pre-requisites
--------------

1) Setup a private ethereum network from here: https://github.com/chafey/ethereum-private-network

2) [Metamask](https://metamask.io/) with supported browser (Chrome is what I use)

3) Meteor

How to run
--------------


1) Make sure your ethereum private test network is running.  

2) Make sure you have created an account with metamask and are connected it to the
localhost 8545 network

Start the meteor application:

```bash
cd patientApp  
meteor npm install  
meteor  
```

Open your web browser to localhost:3000

You should see the page "Welcome to Nucleus.io" and
"Welcome Ethereum Account <your account number>".  If you don't see an ethereum
account number, you need to create an account in metamask.

Click "Register", the registation page should appear.

Click "Submit", to connect your ethereum account to the "Alice Liddel" user.  
Metamask should prompt you with a "CONFIRM TRANASCTION" dialog to sign message.

Click "Sign".  You should now be logged into the application and see a
nav bar with tabs for "Patients" and "Reports".  You will also notice that
the system shows your name as "Alice Liddel" in the upper right corner.

Click "Add Patient".  This will present a screen to add a patient with a
diagnostic report.  

Click "Save".  This will result in the system creating a new Patient document
in mongodb with the PHI.  It will also create a Patient smart contract in
ethereum and save the address in the patient document.  You should now see
the patient John Doe in the worklist.  

Click "John Doe".  This will cause the view report screen to be displayed showing
the PHI.  The system will also log an audit even to the patient smart contract.

Click "Reports" in the navbar.  You will see the report screen.  

Click "Search".  The report should show the audit event created when you clicked
john doe.  The audit events are discovered using an ethereum filter.


FHIR Conformance  
----------

This demo supports the storage of Patient records according to the [FHIR Patient 1.6.0](http://hl7.org/fhir/2016Sep/index.html) resource schema.  

Because the FHIR standard also specifies the support of REST APIs, these Patients are available at the following endpoints.

```
GET    /fhir-1.6.0/Patient/:id    
GET    /fhir-1.6.0/Patient/:id/_history  
PUT    /fhir-1.6.0/Patient/:id  
GET    /fhir-1.6.0/Patient  
POST   /fhir-1.6.0/Patient/:param  
POST   /fhir-1.6.0/Patient  
DELETE /fhir-1.6.0/Patient/:id
```

However, because these endpoints are protected by OAuth, they won't be accessible without an OAuth signin infrastructure, or disabling OAuth.  You can disable OAuth by using the `NOAUTH` environment variable.  So, to access the Patient resource, you'll need to run the following:  

```
# start the meteor application with OAuth disabled  
NOAUTH=true meteor  

# perform an open query of the Patients collection 
curl http://localhost:3000/fhir-1.6.0/Patient
```


Please see the [clinical:hl7-resource-patient](https://github.com/clinical-meteor/hl7-resource-patient) package for more implementation details.  


FHIR Utilities  
----------

We recommend the following utitilies for inspecting the Mongo database, and querying the app via REST calls.  

[Robomongo](https://robomongo.org/) - Mongo database management  
[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) - REST utitlity for the Chrome browser  

