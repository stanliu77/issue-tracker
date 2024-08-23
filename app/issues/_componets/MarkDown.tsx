"use client"
import ErrorMessage from '@/app/components/ErrorMessage'
import IssueSchema from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import axios from 'axios'
import "easymde/dist/easymde.min.css"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from "react-simplemde-editor"
import { z } from 'zod'
type IssueForm = z.infer<typeof IssueSchema>
interface Props{
    issue?:Issue
}
const MarkDown = ({issue}:Props) => {
    const [isSubmit, setisSubmit] = useState(false)
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(IssueSchema)
    })
    const [error, setError] = useState("")
  return (
    <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    setisSubmit(true)
                    if (issue){
                        await axios.patch("/api/issues/"+issue.id,data)
                    }
                    else{
                        await axios.post("/api/issues", data)
                    }
                    router.push("/issues")
                    router.refresh()
                } catch (error) {
                    setisSubmit(false)
                    setError("An unexpected error occured")
                }
            })}>
                <TextField.Root placeholder="Title" defaultValue={issue?.title} {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue= {issue?.description}
                    render={({ field }) =>
                        <SimpleMDE placeholder='Description' 
                    {...field} />
                    } />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmit} className='!cursor-pointer'>{issue?"Update Issue":"Submit New Issue"}{" "}{isSubmit&&<Spinner />}</Button>
            </form>
        </div>
  )
}

export default MarkDown