import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery } from './IssueTable'
import prisma from '@/prisma/client'
import Pagination from '@/app/components/Pagination'
import { Metadata } from 'next'
interface Props{
  searchParams : IssueQuery
}

const issuesPage = async ({searchParams}:Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)?searchParams.status:undefined
  let orderBy: any = undefined;
  if (searchParams.orderBy) {
    orderBy = { [searchParams.orderBy]: searchParams.order };
  }
  const where = {status}
  const pageSize = 10
  const currentPage = parseInt(searchParams.page) || 1
  const issue = await prisma.issue.findMany({
    where,
    orderBy,
    skip:(currentPage-1) * pageSize,
    take:pageSize
  })
  const itemCount = await prisma.issue.count({where})
  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issue} />
      <Pagination itemCount={itemCount} pageSize={pageSize} currentPage={currentPage} />
    </div>
  )
}
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}
export default issuesPage
