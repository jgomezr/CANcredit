// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.15 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract celoWave3 {

    uint public amountPhp;
    uint amountCUSD;
    uint reward;
    uint public remainingPhp;

    address payable public agent;
    address payable public mfi;
    address payable public colateral;

    string[] public transactions;

    uint public startdate;
    uint public enddate;

    constructor(uint _amount, uint _cusd, uint _reward, address _agent, address _mfi, address _colateral, uint _start, uint _end) payable {
        amountPhp = _amount;
        amountCUSD = _cusd;
        reward = _reward;
        remainingPhp = _amount;
        agent = payable(_agent);
        mfi= payable(_mfi);
        colateral = payable(_colateral);
        startdate = _start;
        enddate = _end;
        transactions.push( string.concat("Date: ", Strings.toString(startdate)," Amount: ",Strings.toString(amountPhp)," Type: Created") );
    }

    function loanRepayments(address _agent, uint _amount, uint _date) public payable{
        require(agent == _agent,"Agent that make the request is not related with this contract");
        
        remainingPhp = remainingPhp - _amount;
        if(remainingPhp > 1){
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayment") );
        }else{
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayd"," Incentive: ",Strings.toString(reward)) );
            colateral.transfer(amountCUSD);
            agent.transfer(reward);
        }
    }

    function loanDefault(uint _date, address _mfi, address _colateral) public payable{
        require(mfi==_mfi && colateral == _colateral && remainingPhp > 0,"Entities that make the request is not related with this contract");

        transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(amountCUSD)," Type: Default") );
        mfi.transfer(amountCUSD);
        colateral.transfer(reward);
    }
}