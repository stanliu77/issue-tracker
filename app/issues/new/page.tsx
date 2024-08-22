"use client"
import React, { useState } from 'react'
import { Button, TextField, Callout,Spinner } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
const SimpleMDE = dynamic(()=>import("react-simplemde-editor"),
{ssr:false})
type IssueForm = z.infer<typeof createIssueSchema>
const newIssue = () => {
    const [isSubmit, setisSubmit] = useState(false)
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
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
                    await axios.post("/api/issues", data)
                    router.push("/issues")
                } catch (error) {
                    setisSubmit(false)
                    setError("An unexpected error occured")
                }

            })}>
                <TextField.Root placeholder="Title" {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) =>
                        <SimpleMDE placeholder='Description' {...field} />
                    } />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmit} className='!cursor-pointer'>Submit New Issue{isSubmit&&<Spinner />}</Button>
            </form>
        </div>
    )
}

export default newIssue

