//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Good {
    address public owner;
    
    error NotOwner();
    constructor() {
        owner = msg.sender;
    }

    function setOwner(address _newOnwer) public {
        if (tx.origin != owner) 
        revert NotOwner();
        owner = _newOnwer;
    }

}
