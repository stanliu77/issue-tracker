import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({
    where:{status:"OPEN"}
  })
  const inProcess = await prisma.issue.count({
    where:{status:"IN_PROCESS"}
  })
  const closed  = await prisma.issue.count({
    where:{status:"CLOSED"}
  })
  return (
    <Grid columns={{initial:"1",md:"2"}} gap="6">
      <Flex direction="column" gap="6"><IssueSummary open={open} closed={closed} inProcess={inProcess}/>
      <IssueChart open={open} closed={closed} inProcess={inProcess} />
      </Flex>
      <LatestIssue />
    </Grid>
  )
}
