pragma solidity ^0.4.2;

import "./Owned.sol";
import "./Delegation.sol";

contract LiquidAssociation is Owned {
    IDelegation public delegation;

    Proposal[] public proposals;
    uint public minimumQuorum;
    uint public debatingPeriodInMinutes;

    event ProposalAdded(uint proposalID, address recipient, string description);
    event Voted(uint proposalID, bool position, address voter);
    event ProposalExecuted(uint proposalID, int result, uint quorum, bool active);
    event ChangeOfRules(address delegationAddress, uint minimumSharesToPassAVote, uint minutesForDebate);

    struct Vote {
        bool inSupport;
        address voter;
    }

    struct Proposal {
        address recipient;
        string description;
        uint votingDeadline;
        bool executed;
        bool proposalPassed;
        uint numberOfVotes;
        bytes32 proposalHash;
        Vote[] votes;
        mapping (address => bool) voted;
    }

    /* modifier that allows only shareholders to vote and create new proposals */
    modifier onlyDelegates {
        if (delegation.voteWeight(msg.sender) == 0) throw;
        _;
    }

    function LiquidAssociation(
        address delegationAddress,
        uint minimumSharesToPassAVote, 
        uint minutesForDebate) 
    {
        changeVotingRules(
            delegationAddress,
            minimumSharesToPassAVote, 
            minutesForDebate);
    }

    function changeVotingRules(
        address delegationAddress,
        uint minimumSharesToPassAVote, 
        uint minutesForDebate)
        onlyOwner 
    {
        delegation = IDelegation(delegationAddress);
        if (minimumSharesToPassAVote == 0 ) minimumSharesToPassAVote = 1;
        minimumQuorum = minimumSharesToPassAVote;
        debatingPeriodInMinutes = minutesForDebate;

        ChangeOfRules(
            delegationAddress,
            minimumSharesToPassAVote, 
            debatingPeriodInMinutes);
    }

    function newProposal(
        address target,
        string jobDescription,
        bytes transactionBytecode
    )
        onlyDelegates
        returns (uint proposalID)
    {
        proposalID = proposals.length++;
        Proposal p = proposals[proposalID];
        p.recipient = target;
        p.description = jobDescription;
        p.proposalHash = sha3(target, transactionBytecode);
        p.votingDeadline = now + debatingPeriodInMinutes * 1 minutes;
        p.executed = false;
        p.proposalPassed = false;
        p.numberOfVotes = 0;
        ProposalAdded(proposalID, p.recipient, p.description);
    }

    function numProposals() constant returns (uint numberOfProposals) {
        return proposals.length;
    }

    function checkProposalCode(
        uint proposalNumber,
        address target,
        bytes transactionBytecode
    )
        constant
        returns (bool codeChecksOut)
    {
        Proposal p = proposals[proposalNumber];
        return p.proposalHash == sha3(target, transactionBytecode);
    }

    function vote(uint proposalNumber, bool supportsProposal)
        onlyDelegates
        returns (uint voteID)
    {
        Proposal p = proposals[proposalNumber];
        if (p.voted[msg.sender] == true) throw;

        voteID = p.votes.length++;
        p.votes[voteID] = Vote({inSupport: supportsProposal, voter: msg.sender});
        p.voted[msg.sender] = true;
        p.numberOfVotes = voteID + 1;
        Voted(proposalNumber,  supportsProposal, msg.sender);
        return voteID;
    }

    function executeProposal(uint proposalNumber, bytes transactionBytecode) returns (int result) {
        Proposal p = proposals[proposalNumber];
        /* Check if the proposal can be executed */
        if (now < p.votingDeadline  /* has the voting deadline arrived? */
            ||  p.executed        /* has it been already executed? */
            ||  p.proposalHash != sha3(p.recipient, transactionBytecode)) /* Does the transaction code match the proposal? */
            throw;

        /* tally the votes */
        uint quorum = 0;
        uint yea = 0;
        uint nay = 0;

        for (uint i = 0; i <  p.votes.length; ++i) {
            Vote v = p.votes[i];
            uint voteWeight = delegation.voteWeight(v.voter);
            quorum += voteWeight;
            if (v.inSupport) {
                yea += voteWeight;
            } else {
                nay += voteWeight;
            }
        }

        /* execute result */
        if (quorum <= minimumQuorum) {
            /* Not enough significant voters */
            throw;
        } else if (yea > nay ) {
            /* has quorum and was approved */
            p.executed = true;
            if (!p.recipient.call(transactionBytecode)) {
                throw;
            }
            p.proposalPassed = true;
        } else {
            p.proposalPassed = false;
        }
        // Fire Events
        ProposalExecuted(proposalNumber, result, quorum, p.proposalPassed);
    }

    /* This unnamed function is called whenever someone tries to send ether to it */
    function () {
        throw;     // Prevents accidental sending of ether
    }
}