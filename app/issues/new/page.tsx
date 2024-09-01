import dynamic from 'next/dynamic';
import IssueFormSkelenton from './loading';
import { Metadata } from 'next';
const MarkDown = dynamic(()=>import('../_componets/MarkDown'),{
    ssr:false,
    loading:()=> <IssueFormSkelenton />
})
const newIssue = () => {
    return (
        <MarkDown />
    )
}
export default newIssue
export const metadata:Metadata = {
    title:'Create New issue',
    description:"Create a New issue"
}

