// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./TwoFactorManager.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract RecoveryManager is TwoFactorManager{

    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public currRecoveryRound;

    uint256 private lastRecoveryTime = 0;

    uint256 private lastCancellationTime = 0;

    struct RecoveryRequest {
        address proposedOwner;
        uint256 recoveryRound;
        bool isUsed;
    }

    constructor (IEntryPoint anEntryPoint) TwoFactorManager(anEntryPoint) {}

    mapping(address => RecoveryRequest) public guardianRecoveryRequest;

    event RecoveryInitiated(address indexed by, address newProposedOwner, uint256 indexed round);

    event RecoverySupported(address indexed by, address newProposedOwner, uint256 indexed round);
    
    event RecoveryCancelled(address by, uint256 indexed round);

    event RecoveryExecuted(address indexed  oldOwner, address indexed newOwner, uint256 indexed round);

    function initiateRecovery(address _proposedOwner, bytes memory signature) check2FA(signature) notInRecovery external {
        require(block.timestamp > lastCancellationTime + 1 days, "Can't initiate Recovery due to Recent Cancellation");
        require(block.timestamp > lastRecoveryTime + 30 days, "Can't initiate Recovery wallet due to Recent Recovery");

        if(isTwoFactorEnabled) {
            currRecoveryRound ++;
            inRecovery = true;
            nonce++;

            emit RecoveryInitiated(msg.sender, _proposedOwner, currRecoveryRound);
            return;
        }

        require(guardians.contains(msg.sender), "Only Guardian has access to this request");
        require(!(_proposedOwner == owner), "Provided Address can't be the Owner");
        require(!guardians.contains(_proposedOwner),"Provided Address can't be one of the guardians");

        currRecoveryRound ++;
        guardianRecoveryRequest[msg.sender] = RecoveryRequest(
            _proposedOwner,
            currRecoveryRound,
            false
        );
        inRecovery = true;
        guardianToRemoveTimestamp[msg.sender] = block.timestamp;
        nonce++;
        emit RecoveryInitiated(msg.sender, _proposedOwner, currRecoveryRound);
    }

    function supportRecovery(address _proposedOwner) onlyGuardian onlyInRecovery external {
        require(!(_proposedOwner == owner), "Provided Address can't be the Owner");
        require(!guardians.contains(_proposedOwner),"Provided Address can't be one of the guardians");

        guardianRecoveryRequest[msg.sender] = RecoveryRequest(
            _proposedOwner,
            currRecoveryRound,
            false
        );
        guardianToRemoveTimestamp[msg.sender] = block.timestamp;
        emit RecoverySupported(msg.sender, _proposedOwner, currRecoveryRound);
    }

    function cancelRecovery(bytes memory signature) onlyInRecovery check2FA(signature) external {
        _requireFromEntryPointOrOwner();
        inRecovery = false;
        lastCancellationTime = block.timestamp;
        emit RecoveryCancelled(msg.sender, currRecoveryRound);
    }

    function executeRecovery(address newOwner, address[] calldata guardianList, bytes memory signature) onlyGuardian onlyInRecovery check2FA(signature) external {
        require(guardianList.length >= threshold, "more guardians required to transfer ownership");
        require(!(newOwner == owner), "Provided Address can't be the Owner");
        require(!guardians.contains(newOwner),"Provided Address can't be one of the guardians");

        for (uint i = 0; i < guardianList.length; i++) {
            
            RecoveryRequest memory request = guardianRecoveryRequest[guardianList[i]];

            require(request.recoveryRound == currRecoveryRound, "round mismatch");
            require(request.proposedOwner == newOwner, "disagreement on new owner");
            require(!request.isUsed, "duplicate guardian used in recovery");

            guardianRecoveryRequest[guardianList[i]].isUsed = true;
        }

        inRecovery = false;
        address _oldOwner = owner;
        owner = newOwner;
        guardianToRemoveTimestamp[msg.sender] = block.timestamp;
        lastRecoveryTime = block.timestamp;
        nonce++;

        emit RecoveryExecuted(_oldOwner, newOwner, currRecoveryRound);
    }


}