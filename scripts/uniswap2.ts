import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();

    const UNISWAP_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const UNISWAP_FACTORY_ADDRESS = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";

    // Set the swap parameters
    const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    // Get the UniswapV2Router02 and UniSwapv2Factory contracts
    const swap = await ethers.getContractAt("IUniswapV2Router01", UNISWAP_ADDRESS);
    const swapFactory = await ethers.getContractAt("IUniswapV2Factory", UNISWAP_FACTORY_ADDRESS);

    async function interaceWithAddLiquidity() {
        const tokenA = WETH_ADDRESS;
        const tokenB = DAI_ADDRESS;
        const amountADesired = 100; // Amount of token A desired
        const amountBDesired = 200; // Amount of token B desired
        const amountAMin = 90; // Minimum amount of token A accepted
        const amountBMin = 180; // Minimum amount of token B accepted
        const to = signer;
        const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline in UNIX timestamp

        const tx = await swap.addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );

        // const weth = await ethers.getContractAt("IERC20", WETH_ADDRESS);
        // console.log(weth.balanceOf());
        console.log("Transaction hash:", tx.hash);
    }
    interaceWithAddLiquidity();

    async function interactWithRemoveLiquidity() {
        const tokenA = WETH_ADDRESS;
        const tokenB = DAI_ADDRESS;
        const liquidity = 100; // Amount of liquidity to remove
        const amountAMin = 90; // Minimum amount of token A accepted
        const amountBMin = 180; // Minimum amount of token B accepted
        const to = signer;
        const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline in UNIX timestamp

        const tx = await swap.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );

        console.log("Transaction hash:", tx.hash);
    }

    interactWithRemoveLiquidity();

    console.log(await swapFactory.getPair(DAI_ADDRESS, WETH_ADDRESS));

    async function interactWithAddLiquidityETH() {
        const token = DAI_ADDRESS; // Address of the ERC-20 token you want to add liquidity to
        const amountTokenDesired = 100; // Desired amount of token to add
        const amountTokenMin = 90; // Minimum amount of token accepted
        const amountETHMin = 0.1; // Minimum amount of ETH accepted
        const to = signer;
        const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline in UNIX timestamp

        const tx = await swap.addLiquidityETH(
            token,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            to,
            deadline,
            { value: amountETHMin }
        );

        console.log("Transaction hash:", tx.hash);
    }

    // interactWithAddLiquidityETH();

    async function interactWithRemoveLiquidityETH() {
        const token = UNISWAP_ADDRESS; // Address of the WETH token you want to remove liquidity from
        const liquidity = 100; // Amount of liquidity to remove
        const amountTokenMin = 90; // Minimum amount of token accepted
        const amountETHMin = 0.1; // Minimum amount of ETH accepted
        const to = signer;
        const deadline = Math.floor(Date.now() / 1000) + 3600; // Deadline in UNIX timestamp

        const tx = await swap.removeLiquidityETH(
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadline
        );

        console.log("Transaction hash:", tx.hash);
    }

    // interactWithRemoveLiquidityETH();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
