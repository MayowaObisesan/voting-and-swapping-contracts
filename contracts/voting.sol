// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

/**
 * ::Task 2::
 * Create a Decentralized voting contract.
 * - Allow users to create and participate in votes securely and transparently
 */
contract Voting {
    struct Voter {
        bool voted;
        uint vote; // index of the voted proposal
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    mapping(address => Voter) public voters;
    mapping(address => Proposal) public hasVotedProposal;

    Proposal[] public proposals;

    // Events
    event Voted(address voter, string proposalName);

    /**
     * Create the contract with the proposal names
     */
    constructor(string[] memory proposalNames) {
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    /**
     * Function to allow users vote for a specific proposal
     * - Update the vote count for the chosen proposal
     * - Change the user's voted status to true
     */
    function vote(uint proposalIndex) external {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        require(sender.vote != proposalIndex, "You've voted for this proposal");
        require(
            keccak256(abi.encodePacked(hasVotedProposal[msg.sender].name)) !=
                keccak256(abi.encodePacked(proposals[proposalIndex].name)),
            "Already voted for this proposal"
        );
        sender.voted = true;
        sender.vote = proposalIndex;

        hasVotedProposal[msg.sender] = proposals[proposalIndex];
        proposals[proposalIndex].voteCount += 1;

        emit Voted(msg.sender, proposals[proposalIndex].name);
    }

    /**
     * Function to determine the winning proposal based on:
     * 1. The vote counts i.e., loop through all the proposals to find the highest vote count.
     */
    function winningProposal() internal view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /**
     * Returns the name of the winning Proposal
     */
    function winnerName() external view returns (string memory winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
        // TOOD: If there is a draw in the vote result
    }
}
