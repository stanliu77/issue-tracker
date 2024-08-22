import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Heading><Skeleton /></Heading>
      <Flex className='space-x-3' my="2">
        <Skeleton width="5em" />
        <Skeleton width="8em" />
      </Flex>
      <Card className='prose' mt="4">
        <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default LoadingDetailPage