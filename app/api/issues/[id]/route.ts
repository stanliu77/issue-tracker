import IssueSchema from "@/app/validationSchema"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
interface Props{
    params:{id:string}
}
export async function PATCH(request:NextRequest,{params}:Props){
    const body = await request.json()
    const validation = IssueSchema.safeParse(body)
    if (!validation.success){
        return NextResponse.json(validation.error.errors,{status:400})
    }
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if (!issue) 
        return NextResponse.json({error:"Invalid Issue"},{status:404})
    const updateIssue = await prisma.issue.update({
        where:{id:issue.id},
        data:{
            title:body.title,
            description:body.description
        }
    })
    return NextResponse.json(updateIssue,{status:201})
}
export async function DELETE(request:NextRequest,{params}:Props){
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if (!issue) 
        return NextResponse.json({error:"Invalid Issue"},{status:404})
    await prisma.issue.delete({
        where:{id:issue.id},
    })
    return NextResponse.json({})
}