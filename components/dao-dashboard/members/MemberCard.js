import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { Flex, Text } from '../../../styles/elements'
import { truncateAddress } from '../../../utils/'
import { Spinner } from '../../elements'

export default function MemberCard({ member, totalSupply }) {
  const { data: ensName, isLoading } = useEnsName({
    address: member?.address,
    chainId: Number(1),
  })
  const { push } = useRouter()
  const routeProfile = () => {
    push(`/users/${member.address}`)
  }

  // TODO:
  //  - Add profile image
  console.log('ens', ensName)
  return (
    <Flex dir="row" align="separate" css={{ background: '$gray1', padding: '1rem', gap: '1rem' }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Text
            as="button"
            color="foreground"
            css={{
              all: 'unset',
              minWidth: '15px',
              '&:hover': {
                color: '$gray12',
              },
            }}
            onClick={routeProfile}
          >
            {!ensName ? truncateAddress(member?.address) : ensName}
          </Text>
          <Text color="foreground">{Number(ethers.utils.formatUnits(member.shares, 18))}</Text>
          <Text color="foreground">
            {member.shares != totalSupply ? ((member.shares / totalSupply) * 100).toPrecision(2) : '100'}%
          </Text>
        </>
      )}
    </Flex>
  )
}
