import prisma from '@/prisma/client'
import { Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssue = async () => {
    const Issues = await prisma.issue.findMany({
        orderBy: { createAt: "desc" },
        take: 5
    })
    return (
        <Card>
            <Heading size="4" mb="5">Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {Issues.map(issue=>
                       <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex direction="column" gap="2" align="start" ><Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <IssueStatusBadge status={issue.status}/>
                            </Flex>
                        </Table.Cell>
                        </Table.Row> 
                    )}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssue