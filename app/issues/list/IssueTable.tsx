import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue, Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    order:string
    page: string
}
interface Props {
    searchParams: IssueQuery,
    issues: Issue[]
}
const columns: {
    label: string,
    value: keyof Issue,
    className?: string
}[] = [
        { label: "Issue", value: "title" },
        { label: "Status", value: "status", className: "hidden md:table-cell" },
        { label: "Created", value: "createAt", className: "hidden md:table-cell" }
    ]
const IssueTable = async ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>{columns.map(column => {
                    const isCurrentOrderBy = column.value === searchParams.orderBy
                    const nextOrder = isCurrentOrderBy && searchParams.order === 'asc' ? 'desc' : 'asc';
                    return (
                        <Table.ColumnHeaderCell key={column.value} className={column.className} >
                            <Link href={{
                                query: {
                                    ...searchParams,
                                    orderBy: column.value,
                                    order:nextOrder
                                }
                            }}>
                                {column.label}
                            </Link>
                            {
                                isCurrentOrderBy &&(searchParams.order==="asc"? <AiOutlineArrowUp className="inline" />:
                                    <AiOutlineArrowDown className="inline" />
                                )
                                
                            }
                        </Table.ColumnHeaderCell>
                    )
                })}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => <Table.Row key={issue.id}>
                    <Table.RowHeaderCell>
                        <Link href={`/issues/${issue.id}`}>
                            {issue.title}
                        </Link>
                        <div className='block md:hidden'>
                            <IssueStatusBadge status={issue.status} />
                        </div>
                    </Table.RowHeaderCell>
                    <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.createAt.toDateString()}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table.Root>
    )
}
export const columnNames = columns.map(column => column.value)
export default IssueTable