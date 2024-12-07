// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract CarbonCoins {

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
        if (userData[userAdd].totalEarnings > 0) {
            // Update user balance adding reward balance
            userData[userAdd].balance = userData[userAdd].balance + rewardAmount;
            userData[userAdd].totalEarnings = userData[userAdd].totalEarnings + rewardAmount;
        } else {
            // Add user to the mapping
            userData[userAdd] = userInfo({
                balance: rewardAmount,
                totalEarnings: rewardAmount
            });
        }

        return userData[userAdd].balance;
    }

    function subtractToken(address userAdd, uint256 amount) external returns (uint256) {
        // Check if the user exists
        require(userData[userAdd].totalEarnings > 0, "User does not exist");

        // Check if the user has enough balance
        require(userData[userAdd].balance >= amount, "Insufficient balance");

        // Subtract the amount from the user balance
        userData[userAdd].balance = userData[userAdd].balance - amount;

        return userData[userAdd].balance;
    }

    function addUser(address userAdd) external returns (uint256) {

        // Check if the user exists
        require(userData[userAdd].totalEarnings == 0, "User already exists");

        userData[userAdd] = userInfo({
            balance: 0,         
            totalEarnings: 0    
        });
        
        return userData[userAdd].balance;
    }

}