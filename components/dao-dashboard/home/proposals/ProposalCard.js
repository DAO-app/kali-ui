import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from "./../../../../utils/formatters";
import { Flex, Box, Text } from '../../../../styles/elements'
import { bounce } from '../../../../styles/animation'
import { styled } from '../../../../styles/stitches.config'
import Tag from '../../../../styles/proposal/Tag';
import Vote from '../../vote'

const Icon = styled(Image, {
  '&:hover': {
    animation: `${bounce} 0.5s infinite`,
  },
})

export const ProposalCard = ({ proposal }) => {
  const router = useRouter()
  const ensName = useEnsName({
    address: proposal['proposer'],
    chainId: 1,
  })
  const proposer = ensName.data != null ? ensName.data : truncateAddress(proposal['proposer'])

  return (
    <Flex
      dir="row"
      gap="sm"
      css={{
        padding: '1rem 0.5rem 1rem 0.5rem',
        minWidth: '70vw',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottom: '1px solid hsla(0, 0%, 90%, 0.1)',
          borderTop: '1px solid hsla(0, 0%, 90%, 0.1)',
          '&:hover': {
            background: '$gray800',
          },
      }}
    >
      <Flex
        dir="col"
        gap="md"
        minWidth="10%"
        height="100%"
        css={{
          paddingRight: '1rem',
        }}
      >
        <Vote proposal={proposal} />
      </Flex>
      <Link
        href={{
          pathname: `/daos/[chainId]/[dao]/proposals/${proposal['serial']}`,
          query: {
            chainId: router.query.chainId,
            dao: router.query.dao,
          },
        }}
        passHref
      >
        <Flex
          dir="col"
          gap="sm"
          css={{
            minWidth: '80%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Flex
            color="foreground"
            gap="sm"
            css={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Tag type={proposal['proposalType']} />
            <Text
              css={{
                fontFamily: 'Screen',
                color: 'hsla(0, 0%, 90%, 0.7)',
              }}
            >
              Proposal #{proposal?.serial} by
            </Text>
            <Text
              css={{
                fontFamily: 'Screen',
                color: '$purple300',
              }}
            >
              {proposer}
            </Text>
            
          </Flex>
          <Box>
            {proposal['description'].length > 100
              ? proposal['description'].slice(0, 100) + '...'
              : proposal['description']}
          </Box>
          
        </Flex>
      </Link>
    </Flex>
  )
}
