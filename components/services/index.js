import React from 'react'
import { Flex, Text } from '../../styles/elements'
import { serviceProviders } from '../../constants/serviceProviders'
import Image from 'next/image'

export default function Services() {
  return (
    <Flex dir="col" gap="md">
      {serviceProviders.map((provider, index) => (
        <Flex
          as="a"
          key={index}
          href={provider.link}
          target="_blank"
          css={{
            all: 'unset',
            padding: '10px',
            background: '$gray2',
            borderRadius: '20px',
            border: '1px solid $gray3',
            height: 'auto',
            width: '15rem',

            '&:hover': {
              background: '$gray3',
              border: '1px solid $gray4',
            },
            '&:active': {
              background: '$gray4',
              border: '1px solid $gray5',
            },
          }}
        >
          {!provider.icon ? (
            <Text
              css={{
                fontSize: '25px',
                fontWeight: '800',
                color: '$violet9',
              }}
            >
              {provider.name}
            </Text>
          ) : (
            <Image src={provider.icon} width="60px" height="60px" />
          )}

          <Text>{provider.text}</Text>
        </Flex>
      ))}
    </Flex>
  )
}
