//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "@account-abstraction/contracts/core/BaseAccount.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract OwnerManager is BaseAccount, Initializable {
    using ECDSA for bytes32;    

    using EnumerableSet for EnumerableSet.AddressSet;

    address public owner;

    uint256 public threshold = 0;

    EnumerableSet.AddressSet internal guardians;

    IEntryPoint internal immutable _entryPoint;

    mapping (address => uint256) public guardianToRemoveTimestamp;

    event KryptonInitialized(IEntryPoint indexed entryPoint, address indexed owner);

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }


    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
        _disableInitializers();
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the account itself (which gets redirected through execute())
        require(msg.sender == owner || msg.sender == address(this), "only owner");
    }

    function initialize(address _owner, address[] memory guardianAddr, uint256 _threshold) public virtual initializer {
        _initialize(_owner, guardianAddr, _threshold);
    }

    function _initialize(address _owner, address[] memory guardianAddr, uint256 _threshold) internal virtual {
        require(_threshold <= guardianAddr.length, "Threshold is too high");

         for(uint i = 0; i < guardianAddr.length; i++) {
            require(!(guardianAddr[i] == _owner), "Owner can't be a guardian");
            require(!guardians.contains(guardianAddr[i]), "Duplicate Guardian Found");
          
            guardians.add(guardianAddr[i]);
            guardianToRemoveTimestamp[guardianAddr[i]] = block.timestamp;
        }
        threshold = _threshold;
        owner = _owner;
        emit KryptonInitialized(_entryPoint, owner);
    }

    // Require the function call went through EntryPoint or owner
    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(entryPoint()) || msg.sender == owner, "account: not Owner or EntryPoint");
    }

    modifier  onlyGuardian {
        require(guardians.contains(msg.sender), "Only Guardian has access to this request");
        _;
    }

    function isGuardian(address _guardian) public view returns (bool) {
        return guardians.contains(_guardian);
    }

    function getAllGuardians() external view returns (bytes32[] memory) {
       return guardians._inner._values;
    }

    /// implement template method of BaseAccount
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
    internal override virtual returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        if (owner != hash.recover(userOp.signature))
            return SIG_VALIDATION_FAILED;
        return 0;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value : value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
}