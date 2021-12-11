// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

// randomPerson = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
contract NemoCoin {
    mapping(address => uint256) public coinBalance;

    enum UserType {
        TokenHolder,
        Admin,
        Owner
    }

    struct AccountInfo {
        address account;
        string firstName;
        string lastName;
        UserType userType;
    }

    mapping(address => AccountInfo) public registeredAccounts;
    mapping(address => bool) public frozenAccount;
    address public owner;

    uint256 public constant maxTransferLimit = 15000;
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event FrozenAccount(address target, bool frozen);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier checkValidTransfer(uint256 _amount) {
        require(coinBalance[msg.sender] >= _amount, "Not enough balance");
        _;
    }

    modifier checkLimit(uint256 _amount) {
        require(
            _amount < maxTransferLimit,
            "Amount should be less than maxTransferLimit"
        );
        _;
    }

    constructor(uint256 _initialSupply) {
        owner = msg.sender;

        mintToken(owner, _initialSupply);
    }

    function transfer(address to, uint256 _amount)
        external
        checkValidTransfer(_amount)
        checkLimit(_amount)
    {
        require(coinBalance[to] + _amount >= coinBalance[to]);
        coinBalance[msg.sender] -= _amount;
        coinBalance[to] += _amount;
        emit Transfer(msg.sender, to, _amount);
    }

    function mintToken(address _recipient, uint256 _mintedAmount)
        public
        onlyOwner
    {
        coinBalance[_recipient] += _mintedAmount;
        emit Transfer(owner, _recipient, _mintedAmount);
    }

    function registerAccount(
        address account,
        string memory firstName,
        string memory lastName,
        bool isAdmin
    ) public onlyOwner {}

    function validateAccount(address _account) internal view returns (bool) {
        if (frozenAccount[_account] && coinBalance[_account] > 0) return true;
        return false;
    }

    function getBalance() public view returns (uint256) {
        return coinBalance[msg.sender];
    }
}
