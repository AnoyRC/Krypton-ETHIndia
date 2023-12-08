// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./OwnerManager.sol";
import "../common/2FADummy.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract TwoFactorManager is OwnerManager{

    bool public inRecovery;

    address public twoFactorOwner;

    bool public isTwoFactorEnabled = false;

    uint256 internal nonce = 1;

    uint public twoFactorCooldown = 30 minutes;

    uint public recentTwoFactor = 0;

    event TwoFactorEnabled(address indexed by);

    event TwoFactorChanged(address indexed by);

    event TwoFactorCooldownChanged(address indexed by, uint cooldown);

    constructor(IEntryPoint anEntryPoint) OwnerManager(anEntryPoint) {}

    modifier check2FA(bytes memory signature) {
        if(isTwoFactorEnabled && recentTwoFactor + twoFactorCooldown < block.timestamp){
            require(verifyTwoFactor(signature), "2FA Verification failed");
            recentTwoFactor = block.timestamp;
        }
        _;
    }

    modifier in2FA() {
        require(isTwoFactorEnabled, "2FA needs to be enabled");
        _;
    }

    modifier notIn2FA() {
        require(!isTwoFactorEnabled, "2FA is already enabled");
        _;
    }

    modifier notInRecovery {
        require(!inRecovery, "Wallet is in Recovery mode");
        _;
    }

    modifier onlyInRecovery {
        require(inRecovery, "Wallet is not in Recovery mode");
        _;
    }

    function enableTwoFactorAuth(address _twoFactorOwner) notIn2FA notInRecovery  external {
        _requireFromEntryPointOrOwner();
        uint size;
        assembly { size := extcodesize(_twoFactorOwner) }
        require(size == 0, "2FA Owner cannot be a contract");

        twoFactorOwner = _twoFactorOwner;
        isTwoFactorEnabled = true;

        emit TwoFactorEnabled(msg.sender);
    } 

    function changeTwoFactorAuth(address _newTwoFactorOwner, bytes memory signature) in2FA notInRecovery check2FA(signature) external {
        _requireFromEntryPointOrOwner();
        uint size;
        assembly { size := extcodesize(_newTwoFactorOwner) }
        require(size == 0, "2FA Owner cannot be a contract");

        twoFactorOwner = _newTwoFactorOwner;
        nonce++;

        emit TwoFactorChanged(msg.sender);
    }

    function changeTwoFactorCooldown(uint256 _cooldown, bytes memory signature) external in2FA notInRecovery check2FA(signature) {
        _requireFromEntryPointOrOwner();
        twoFactorCooldown = _cooldown * 1 minutes;

        emit TwoFactorCooldownChanged(msg.sender, _cooldown);
    }

    function getBytecode(address _owner, address _twoFactorOwner, uint256 _timeStamp ) private pure returns(bytes memory) {
        bytes memory bytecode = type(twoFactorDummy).creationCode;
        return abi.encodePacked(bytecode, abi.encode(_owner, _twoFactorOwner, _timeStamp));
    }

    function getWalletAddress(bytes memory bytecode, uint _salt) private view returns (address) {
        bytes32 hash = keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            _salt,
            keccak256(bytecode)
        ));

        return address(uint160(uint256(hash)));
    }

    function getTime() private view returns ( uint256 ){
        uint256 time = block.timestamp;
        return time / 1000 * 1000;
    }

    function getTimeBasedMsg() public view returns (string memory) {
        uint timeStamp = getTime();
        bytes memory bytecode = getBytecode(owner, twoFactorOwner, timeStamp);
        address message = getWalletAddress(bytecode, nonce);
        return Strings.toHexString(uint160(message), 20);
    }

    function getLastTimeBasedMsg() private view returns (string memory) {
        uint timeStamp = getTime() - 1000;
        bytes memory bytecode = getBytecode(owner, twoFactorOwner, timeStamp);
        address message = getWalletAddress(bytecode, nonce);
        return Strings.toHexString(uint160(message), 20);
    }

    // Note: If not working in browser, use this before the code : ethereum.request({ method: 'eth_requestAccounts' })
    // 1. use getTimeBasedMsg()
    // 2. convert to lowercase
    // 3. use getMessagehash() to get the hash from lowercase
    // 4. Sign the message using 
    //    account = "0x3C700d88616C9e186aed7dd59B2e7f60819bf863"
    //    ethereum.request({ method: "personal_sign", params: [account, hash]}).then(console.log)
    // 5. verify with verifyTwoFactor

    function verifyTwoFactor( bytes memory signature ) public view returns (bool) {
        string memory currentHash = getTimeBasedMsg();
        string memory lastHash = getLastTimeBasedMsg();
        
        bytes32 messageHash = getMessageHash(currentHash);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
    
        bool isVerified = recoverSigner(ethSignedMessageHash, signature) == twoFactorOwner;

        if(isVerified == true) {
            return isVerified;
        } else {
            bytes32 lastMessageHash = getMessageHash(lastHash);
            bytes32 lastEthSignedMessageHash = getEthSignedMessageHash(lastMessageHash);
            return recoverSigner(lastEthSignedMessageHash, signature) == twoFactorOwner;
        }
    }

    function getMessageHash(
        string memory _message
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked( _message));
    }

    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    function verify(
        address _signer,
        string memory _message,
        bytes memory signature
    ) private pure returns (bool) {
        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) private pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) private pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
   
            s := mload(add(sig, 64))

            v := byte(0, mload(add(sig, 96)))
        }
    }
}