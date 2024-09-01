import { Issue } from '@prisma/client'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
interface Props{
    issue:Issue
}
const EditorButton = ({issue}:Props) => {
  return (
    <Button><Link href={`/issues/${issue.id}/edit`} >Edit</Link></Button>
  )
}

export default EditorButton