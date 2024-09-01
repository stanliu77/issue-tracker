"use client"
import { Card } from '@radix-ui/themes';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
interface Props {
    open: number,
    inProcess: number,
    closed: number
}
const IssueChart = ({ open, inProcess, closed }: Props) => {
    const data: {
        label: string,
        value: number
    }[] = [
            { label: "Open", value: open },
            { label: "In Process", value: inProcess },
            { label: "Closed", value: closed }
        ]
    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey="value" barSize={60} style={{fill: "var(--accent-9)"}} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
export default IssueChart