'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import { Mail } from 'lucide-react'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import { TableEmptyState } from '@/components/ui/EmptyState'
import { formatDateTime } from '@/lib/utils'

type Message = { id: number; name: string; email: string; message: string; createdAt: string }

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/messages')
      .then(r => r.json())
      .then(data => { setMessages(data); setLoading(false) })
  }, [])

  return (
    <div>
      <Topbar title="Messages" />
      <div className="p-6">
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Message</TableHeader>
              <TableHeader>Received</TableHeader>
            </tr>
          </TableHead>

          {loading ? (
            <TableRowSkeleton rows={5} cols={4} />
          ) : messages.length === 0 ? (
            <TableEmptyState
              colSpan={4}
              icon={Mail}
              title="No messages yet"
              description="Messages submitted from the Contact page will appear here."
            />
          ) : (
            <TableBody>
              {messages.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium text-text-primary">{m.name}</TableCell>
                  <TableCell className="text-text-secondary">{m.email}</TableCell>
                  <TableCell className="text-text-secondary max-w-md">{m.message}</TableCell>
                  <TableCell className="text-text-muted text-xs">{formatDateTime(m.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
