pragma solidity ^0.4.17;


contract Inbox {
    string public message;


    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public { //modifies contract variable data
        message = newMessage;
    }

}
