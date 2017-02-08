pragma solidity ^0.4.2;

import "./IToken.sol";
import "./Owned.sol";

contract IDelegation{
    mapping (address => uint) public voteWeight;
}

contract Delegation is IDelegation, Owned {
    IToken public _weightToken;

    mapping (address => uint) public _voterId;
    DelegatedVote[] public _delegatedVotes;
    uint public _delegatedPercent;
    uint public _lastRoundTime;
    uint public _numberOfRounds;
    uint public _maxRounds;

    event ChangeOfRules(
        address tokenAddress,
        uint delegatedPercent,
        uint maxNumberOfRounds
    );

    event DelegationRoundFinished(uint roundNumber);

    struct DelegatedVote {
        address nominee;
        address voter;
    }

    function Delegation(
        address tokenAddress,
        uint percentLossInEachRound,
        uint maxRounds)
    {
        changeRules(tokenAddress, percentLossInEachRound, maxRounds);
    }

    function changeRules(
        address tokenAddress,
        uint percentLossInEachRound,
        uint maxRounds)
        onlyOwner
    {
        _weightToken = IToken(tokenAddress);
        _delegatedPercent = 100 - percentLossInEachRound;
        if (_delegatedPercent > 100) _delegatedPercent = 100;
        _maxRounds = maxRounds;
        _delegatedVotes.length++;
        _delegatedVotes[0] = DelegatedVote({nominee: 0, voter: 0});

        ChangeOfRules(tokenAddress, _delegatedPercent, _maxRounds);
    }

    function delegateVote(address nominatedAddress) returns (uint voteIndex) {
        if (_voterId[msg.sender] == 0) {
            _voterId[msg.sender] = _delegatedVotes.length;
            voteIndex = _delegatedVotes.length++;
        }
        else {
            voteIndex = _voterId[msg.sender];
        }

        _delegatedVotes[voteIndex] = DelegatedVote({nominee: nominatedAddress, voter: msg.sender});
    }

    function calculateVotes() {
        
        if (now > _lastRoundTime + 90 minutes) {
            _numberOfRounds = 0;
            _lastRoundTime = now;

            // Distribute the initial weight
            for (uint i=1; i< _delegatedVotes.length; i++) {
                voteWeight[_delegatedVotes[i].nominee] = 0;
            }
            for (i=1; i< _delegatedVotes.length; i++) {
                voteWeight[_delegatedVotes[i].voter] = _weightToken.balanceOf(_delegatedVotes[i].voter);
            }
        }
        else {
            if (_numberOfRounds <= _maxRounds) throw;

            _numberOfRounds++;
            uint lossRatio = 100 * (_delegatedPercent / 100) ** _numberOfRounds;
            if (lossRatio > 0) {
                DelegatedVote memory v;
                uint weight = 0;
                for (i=1; i< _delegatedVotes.length; i++){
                    v = _delegatedVotes[i];

                    if (v.nominee != v.voter && voteWeight[v.voter] > 0) {
                        weight = voteWeight[v.voter] * lossRatio / 100;
                        voteWeight[v.voter] -= weight;
                        voteWeight[v.nominee] += weight;
                    }
                }
            }
        }

        DelegationRoundFinished(_numberOfRounds);
    }
}