pragma solidity ^0.4.2;

contract Patient {

	address public owner;

	event PatientAccessed(address indexed _from);

	function Patient() {
		owner = msg.sender;
	}

	function logAccess(address _from) {
		if(msg.sender != owner) {
			throw;
		}
		PatientAccessed(_from);
	}
}
