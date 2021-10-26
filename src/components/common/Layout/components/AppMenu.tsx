import { HStack } from "@chakra-ui/react"
import Link from "components/common/Link"
import { useRouter } from "next/router"

const AppMenu = (): JSX.Element => {
  const router = useRouter()

  return (
    <HStack
      my={8}
      spacing={8}
      fontSize={{ base: "2xl", md: "3xl" }}
      color="seedclub.white"
    >
      <Link
        href="/"
        _hover={{ textDecoration: "none", color: "seedclub.lightlime" }}
        borderBottomWidth={2}
        borderBottomColor={
          router.asPath === "/" ? "seedclub.lightlime" : "transparent"
        }
      >
        Airdrop
      </Link>
      <Link
        href="/liquidity-mining"
        _hover={{ textDecoration: "none", color: "seedclub.lightlime" }}
        borderBottomWidth={2}
        borderBottomColor={
          router.asPath === "/liquidity-mining"
            ? "seedclub.lightlime"
            : "transparent"
        }
      >
        Liquidity Mining
      </Link>
    </HStack>
  )
}

export default AppMenu