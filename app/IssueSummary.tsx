import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
interface Props {
    open: number,
    inProcess: number,
    closed: number
}
const IssueSummary = ({ open, inProcess, closed }: Props) => {
    const containers: {
        label: string,
        value: number,
        status: Status
    }[] = [
            { label: "Open Issues", value: open, status: "OPEN" },
            { label: "In-process Issues", value: inProcess, status: "IN_PROCESS" },
            { label: "Closed Issues", value: closed, status: "CLOSED" },
        ]
    return (
        <Flex gap="4">
                {containers.map(container =>
                    <Card>
                    <Flex direction="column" gap="1">
                        <Link className='font-medium text-sm' href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                        <Text size="5" className='font-bold'>{container.value}</Text>
                    </Flex>
                    </Card>
                )}
        </Flex>
    )
}

export default IssueSummary