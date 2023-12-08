// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract twoFactorDummy{
    
    address private owner;

    address private twoFactorOwner;

    uint256 private timeStamp;

    constructor(address _owner, address _twoFactorOwner, uint256 _timeStamp ){
        owner = _owner;
        twoFactorOwner = _twoFactorOwner;
        timeStamp = _timeStamp;
    }
    
}