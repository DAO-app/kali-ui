import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import Members from '../../../../components/dao-dashboard/members'
import { useGraph } from '../../../../components/hooks'
import { getMembers } from '../../../../graph/queries'
import { DAO_MEMBERS } from '../../../../graph'

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const chainId = context.params.chainId
  const data = await getMembers(chainId, address)

  return {
    props: {
      members: data?.data.daos[0],
    },
  }
}

export default function MembersPage({ members }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data } = useGraph(daoChain, DAO_MEMBERS, {
    dao: daoAddress,
  })
  // const members = data && data['daos'][0]
  // if (loading) return "Loading..."
  console.log('members', members)
  return (
    <Layout heading={`Members`}>
      <Members members={members} />
    </Layout>
  )
}
