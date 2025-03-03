import React from 'react'
import { Box } from '../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'

export default function Vote({ proposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao

  // const votingPeriod = proposal['dao']['votingPeriod']
  // console.log('votingPeriod', votingPeriod)
  const { data: account } = useAccount()
  const { data, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: daoAddress ?? AddressZero,
      contractInterface: DAO_ABI,
    },
    'vote',
    {
      onSuccess() {
        console.log('vote', data)
      },
    },
  )
  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.creationTime * 1000).getTime()
  const disabled = left > 0 ? true : false

  const vote = async (approval) => {
    if (!proposal || !account) return
    const data = await writeAsync({
      args: [Number(proposal['serial']), Number(approval)],
      overrides: {
        gasLimit: 137853,
      },
    })
  }

  return (
    <>
      <Box
        as="button"
        css={{
          background: 'none',
          border: 'none',
          borderRadius: '100%',
          padding: '0.2rem 0.3rem',
          '&:hover': {
            background: '$green800',
          },
        }}
        onClick={() => vote(true)}
      >
        <BsFillHandThumbsUpFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)'} />
      </Box>
      <Box
        as="button"
        css={{
          background: 'none',
          border: 'none',
          borderRadius: '100%',
          padding: '0.2rem 0.3rem',
          '&:hover': {
            background: '$red800',
          },
        }}
        onClick={() => vote(false)}
      >
        <BsFillHandThumbsDownFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)'} />
      </Box>
    </>
  )
}
