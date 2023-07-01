// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.15 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract celoWave3 {

    uint public amountPhp;
    uint amountCUSD;
    uint public reward;
    uint public remainingPhp;

    address payable public agent;
    address payable public mfi;
    address payable public colateral;

    string[] public transactions;

    uint public startdate;
    uint public enddate;

    address public constant cUSD_ADDRESS = 0x765DE816845861e75A25fCA122bb6898B8B1282a;
    IERC20 public cUSD = IERC20(cUSD_ADDRESS);

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

    function receiveCusd(uint256 amount) external {
        cUSD.transferFrom(msg.sender, address(this), amount);
    }

    function loanRepayments(address _agent, uint _amount, uint _date) public payable{
        require(agent == _agent,"Agent that make the request is not related with this contract");
        
        remainingPhp = remainingPhp - _amount;
        // 6 pesos is the error for the rounding the amount comming to the system and to cover the maximum 9k
        if(remainingPhp > 10){
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayment") );
        }else{
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayd"," Incentive: ",Strings.toString(reward)) );
            cUSD.transfer(agent,reward);
            cUSD.transfer(colateral,cUSD.balanceOf(address(this)));
        }
    }

    function loanRepaymentswt(address _agent, uint _amount, uint _date) public payable{
        require(agent == _agent,"Agent that make the request is not related with this contract");
        
        remainingPhp = remainingPhp - _amount;
        if(remainingPhp > 10){
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayment") );
        }else{
            transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(_amount)," Type: Repayd") );
            cUSD.transfer(colateral,cUSD.balanceOf(address(this)));
        }
    }

    function loanDefault(uint _date, address _mfi, address _colateral) public payable{
        require(mfi==_mfi && colateral == _colateral && remainingPhp > 0,"Entities that make the request is not related with this contract");

        transactions.push( string.concat("Date: ", Strings.toString(_date)," Amount: ",Strings.toString(amountCUSD)," Type: Default") );
        cUSD.transfer(mfi,amountCUSD);
        cUSD.transfer(colateral,cUSD.balanceOf(address(this)));
    }
}