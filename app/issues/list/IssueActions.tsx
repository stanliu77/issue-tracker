import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link' 
import React from 'react'
import IssuseStatusFilter from './IssuseStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify="between" className='mb-5'>
        <IssuseStatusFilter />
        <Button><Link href="new">New Issue</Link></Button>
      </Flex>
  )
}

export default IssueActions