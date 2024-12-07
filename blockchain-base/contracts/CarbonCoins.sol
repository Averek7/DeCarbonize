// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract carbonCoin {

    uint256 totalTokens;

    //Defining structure
    struct userInfo 
    {
        uint256 balance;
        uint256 totalEarnings;
    }

    struct leaderboardRecord
    {
        address userAddress;
        uint256 earnings;
    }
     
    // Creating a mapping
    mapping (
    address => userInfo) userData;
    address[] public userAddress;

    // Function to get the balance of a specific user
    function getBalance(address userAdd) external view returns (uint256) {
        return userData[userAdd].balance;
    }

    function getAllData() external view returns (leaderboardRecord[] memory) {
        // Create an array in memory to store the result
        leaderboardRecord[] memory allData = new leaderboardRecord[](userAddress.length);

        for (uint256 i = 0; i < userAddress.length; i++) {
            address userWalletAddress = userAddress[i];
            allData[i] = leaderboardRecord({
                userAddress: userWalletAddress,
                earnings: userData[userWalletAddress].totalEarnings
            });
        }

        return allData;
    }

    function addReward(address userAdd, uint256 rewardAmount) external returns (uint256) {
        // Check if the user exists
        // require(userData[userAdd].balance > 0, "User not found");

        // Update user balance adding reward balance
        userData[userAdd].balance = userData[userAdd].balance + rewardAmount;

        return userData[userAdd].balance;
    }

    function addUser(address userAdd) external returns (uint256) {

        userData[userAdd] = userInfo({
            balance: 0,         
            totalEarnings: 0    
        });
        
        return userData[userAdd].balance;
    }

}