import dynamic from 'next/dynamic';
import IssueFormSkelenton from './loading';
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

