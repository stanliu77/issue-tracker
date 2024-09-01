"use client"
import { Issue } from '@prisma/client'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
interface Props {
    issue: Issue
}
const DeleteButton = ({ issue }: Props) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const handleDelete = async () => {
        try {
            setIsDelete(true)
            await axios.delete("/api/issues/" + issue.id)
        router.push("/issues/list")
        router.refresh()
        } catch (error) {
            setError(true)
            setIsDelete(false)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button disabled={isDelete} color='red'>Delete {isDelete&&<Spinner />}</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Delete issue</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This issue will no longer be accessible.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={() => handleDelete()}>
                                confirm
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        This issue can not be deleted.
                    </AlertDialog.Description>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={() => setError(false)}>
                                OK
                            </Button>
                        </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
export default DeleteButton

