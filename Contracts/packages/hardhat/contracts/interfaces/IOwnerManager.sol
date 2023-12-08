//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IOwnerManager{
    function initialize(address _owner, address[] memory guardianAddr, uint256 _threshold) external;
}