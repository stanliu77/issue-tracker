import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import ReactMarkdown from 'react-markdown'
import EditorButton from '../_componets/EditorButton'
import DeleteButton from '../_componets/DeleteButton'
import { Metadata } from 'next'

interface Props {
    params: { id: string }
}
const fetchUser = cache((issueId: number) => prisma.issue.findUnique({
    where: { id: issueId }
}))
const IssueDetailPage = async ({ params }: Props) => {
    const issue = await fetchUser(parseInt(params.id))
    if (!issue) notFound()

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className='md:col-span-4'>
                <Heading>{issue.title}</Heading>
                <Flex className='space-x-3' my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createAt.toDateString()}</Text>
                </Flex>
                <Card className='prose max-w-full' mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box >
                <Flex direction={'column'} gap="3">
                    <EditorButton issue={issue} />
                    <DeleteButton issue={issue} />
                </Flex>

            </Box>
        </Grid>
    )
}
export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))
    return {
        title: issue?.title,
        description: 'Detail of issue' + issue?.id
    }
}

export default IssueDetailPage