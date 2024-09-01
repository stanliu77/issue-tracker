import React from 'react'
import dynamic from 'next/dynamic'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueFormSkelenton from './loading'
import { Metadata } from 'next'
interface Props {
  params: { id: string }
}
const NewsEdit = async ({ params }: Props) => {
  const MarkDown = dynamic(()=>import('../../_componets/MarkDown'),{
    ssr:false,
    loading:()=><IssueFormSkelenton/>
  })
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue) notFound()
  return (
    <div>
      <MarkDown issue={issue} />
    </div>
  )
}
export default NewsEdit
export const metadata:Metadata = {
  title:'Edit Issue',
  description:"Edit Issue"
}