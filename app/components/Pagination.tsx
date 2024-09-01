"use client"
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
interface Props{
    itemCount:number,
    pageSize:number,
    currentPage:number
}
const Pagination = ({itemCount,pageSize,currentPage}:Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Math.ceil(itemCount/pageSize)
  if (pageCount<=1) return null
  const changePage = (page:number)=>{
      const params = new URLSearchParams(searchParams)
      params.set("page",page.toString())
      router.push("?"+ params.toString())
  }
  return (
    <Flex align="center" gap="2" className='m-1 float-right'>
        <Text size="2">{currentPage} of {pageCount}</Text>
        <Button color='gray' variant='soft' onClick={()=>changePage(1)} disabled={currentPage==1}>
            <AiOutlineDoubleLeft/>
        </Button>
        <Button color='gray' variant='soft' onClick={()=>changePage(currentPage-1)} disabled={currentPage==1}>
            <AiOutlineLeft/>
        </Button>
        <Button color='gray' variant='soft' onClick={()=>changePage(currentPage+1)} disabled={currentPage==pageCount}>
            <AiOutlineRight/>
        </Button>
        <Button color='gray' variant='soft'onClick={()=>changePage(pageCount)} disabled={currentPage==pageCount}>
            <AiOutlineDoubleRight/>
        </Button>
    </Flex>
  )
}
export default Pagination