import { useWeb3React } from "@web3-react/core"
import useContract from "hooks/useContract"
import useSubmit from "hooks/useSubmit"
import useToast from "hooks/useToast"
import { useMemo } from "react"
import NFPOSITIONMANAGER_ABI from "static/abis/NfPositionManagerAbi.json"
import STAKING_REWARDS_ABI from "static/abis/StakingRewardsAbi.json"
import addresses from "temporaryData/addresses"
import dev from "temporaryData/dev"

const useStakeNft = (tokenId: number) => {
  const { active, account, chainId } = useWeb3React()

  const nftContract = useContract(
    active ? addresses.NFPOSITIOMANAGER_ADDRESS : null,
    NFPOSITIONMANAGER_ABI,
    true
  )

  const stakerContract = useContract(
    active ? addresses.STAKER_ADDRESS : null,
    STAKING_REWARDS_ABI,
    true
  )

  const incentiveKey = useMemo(
    () => ({ ...dev.TEMP_INCENTIVEKEY, refundee: account }),
    [account]
  )

  const toast = useToast()

  // Temp. solution, should use 2 useSubmit hooks for this
  const stakeNft = async () => {
    // Deposit
    const depositRes = await nftContract[
      "safeTransferFrom(address,address,uint256)"
    ](account, addresses.STAKER_ADDRESS, tokenId)
    // Wait for transaction to complete
    await depositRes?.wait()
    // Stake
    const stakeRes = await stakerContract?.stakeToken(incentiveKey, tokenId)
    return stakeRes?.wait()
  }

  return useSubmit<null, any>(stakeNft, {
    onError: (e) => {
      console.log(e)
      toast({
        title: "Error staking NFT",
        description: e?.message,
        status: "error",
      })
    },
    onSuccess: () => {
      toast({
        title: "Successfully submitted transaction!",
        description:
          "It might take some time to finalize the transaction. Please check your wallet for more details.",
        duration: 4000,
        status: "success",
      })
    },
  })
}

export default useStakeNft