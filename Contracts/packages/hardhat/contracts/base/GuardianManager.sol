// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./RecoveryManager.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract GuardianManager is RecoveryManager{
    
    using EnumerableSet for EnumerableSet.AddressSet;

    struct GuardianRequest {
        address proposedGuardian;
        address guardianToChange;
        bool isUsed;
    }

    mapping(address => GuardianRequest) public guardianChangeRequest;

    uint256 public AvailabilityCheckTimePeriod = 182 days;

    bool public inGuardianRequest;

    constructor (IEntryPoint anEntryPoint) RecoveryManager(anEntryPoint) {}

    modifier  notInGuardianRequest {
        require(!inGuardianRequest, "Existing Guardian Change Request found");
        _;
    }

    modifier  onlyInGuardianRequest {
        require(inGuardianRequest, "No Current Guardian Request found");
        _;
    }

    event GuardianshipTransferInitiated(address indexed newGuardian, address oldGuardian);

    event GuardianshipTransferExecuted(address indexed newGuardian, address oldGuardian);

    event GuardianshipTransferCancelled(address by);

    event GuardianAdded(address indexed by, address newGuardian);

    event ThresholdUpdated(address indexed by, uint256 indexed newThreshold);


    function transferGuardianship(address guardianToChange, address newGuardian) onlyGuardian notInGuardianRequest notInRecovery external {
        require(guardians.contains(guardianToChange) , "Provided address is not a guardian");
        require(!(guardianToChange == owner), "Owner can't be a new guardian");
        guardianChangeRequest[msg.sender] = GuardianRequest(
            newGuardian,
            guardianToChange,
            false
        );
        inGuardianRequest = true;
        nonce++;

        emit GuardianshipTransferInitiated(newGuardian, guardianToChange);
    }

    function executeGuardianshipTransfer(address appellant, bytes memory signature) onlyInGuardianRequest notInRecovery check2FA(signature) external {
        _requireFromEntryPointOrOwner();
        GuardianRequest memory request = guardianChangeRequest[appellant];
        require(!request.isUsed, "Guardian Request is already Used");
        require(guardians.contains(request.guardianToChange), "Provided address is not a guardian");
        require(!guardians.contains(request.proposedGuardian), "Provided Address is already a guardian");

        guardians.add(request.proposedGuardian);
        guardians.remove(request.guardianToChange);

        guardianChangeRequest[appellant].isUsed = true;
        inGuardianRequest = false;
        nonce++;

        emit GuardianshipTransferExecuted(request.proposedGuardian, request.guardianToChange);
    }

    function cancelGuardianshipTransfer(bytes memory signature) onlyInGuardianRequest notInRecovery check2FA(signature) external {
        _requireFromEntryPointOrOwner();
        inGuardianRequest = false;
        emit GuardianshipTransferCancelled(msg.sender);
    }

    function addGuardian(address newGuardian, bytes memory signature) notInGuardianRequest notInRecovery check2FA(signature) external {
        _requireFromEntryPointOrOwner();
        require(!guardians.contains(newGuardian), "Provided Address is already a Guardian");
        require(!(newGuardian == owner), "Provided Address can't be the Owner");
        // isGuardian[newGuardian] = true;
        guardians.add(newGuardian);
        nonce++;

        emit GuardianAdded(msg.sender, newGuardian);
    }

    function editThreshold(uint256 _threshold, bytes memory signature) notInGuardianRequest check2FA(signature) notInRecovery external {
        _requireFromEntryPointOrOwner();
        require(threshold >= 1, "Threshold must be greater than 1");
        threshold = _threshold;
        nonce++;

        emit ThresholdUpdated(msg.sender, _threshold);
    }
}