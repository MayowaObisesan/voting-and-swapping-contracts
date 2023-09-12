import { ethers } from "hardhat";

async function main() {
    const proposalNames = ["firstProposal", "secondProposal", "thirdProposal"];

    const voting = await ethers.deployContract("Voting", [proposalNames]);
    await voting.waitForDeployment();

    console.log(
        `Voting contract deployed to ${voting.target}`
    );

    // Create two users as the voters
    const [voter1, voter2] = await ethers.getSigners();

    // Create 2 vote for the first proposal
    await voting.vote(1);
    await voting.connect(voter2).vote(1);
    // Log the vote of the first proposal

    // Create a vote for the second proposal
    await voting.vote(2);

    // Get the winning proposal
    const winner = await voting.winnerName();
    console.log("Winner of the Vote: ", winner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
