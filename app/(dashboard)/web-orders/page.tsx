'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import { TableEmptyState } from '@/components/ui/EmptyState'
import { formatCurrency, formatDateTime } from '@/lib/utils'

type WebOrder = {
  id: number
  customerName: string
  customerPhone: string
  orderType: string
  status: string
  total: number
  createdAt: string
  items: { id: number; productName: string; variantName: string; quantity: number }[]
}

const statusBadge: Record<string, BadgeVariant> = {
  pending: 'pending',
  confirmed: 'blue',
  preparing: 'purple',
  completed: 'completed',
  cancelled: 'cancelled',
}

const nextStatus: Record<string, { label: string; status: string } | undefined> = {
  pending: { label: 'Confirm', status: 'confirmed' },
  confirmed: { label: 'Start Preparing', status: 'preparing' },
  preparing: { label: 'Mark Completed', status: 'completed' },
}

export default function WebOrdersPage() {
  const [orders, setOrders] = useState<WebOrder[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/web-orders')
    setOrders(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/web-orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  return (
    <div>
      <Topbar title="Website Orders" />
      <div className="p-6">
        <Table>
          <TableHead>
            <tr>
              <TableHeader>#ID</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Items</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </TableHead>

          {loading ? (
            <TableRowSkeleton rows={6} cols={8} />
          ) : orders.length === 0 ? (
            <TableEmptyState
              colSpan={8}
              icon={ShoppingBag}
              title="No website orders yet"
              description="Orders placed through the restaurant website will appear here."
            />
          ) : (
            <TableBody>
              {orders.map(o => {
                const next = nextStatus[o.status]
                return (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-text-muted text-xs">#{o.id}</TableCell>
                    <TableCell className="text-text-secondary">
                      <div className="font-medium text-text-primary">{o.customerName}</div>
                      <div className="text-xs text-text-muted">{o.customerPhone}</div>
                    </TableCell>
                    <TableCell className="text-text-secondary capitalize">{o.orderType.replace('_', '-')}</TableCell>
                    <TableCell className="text-text-muted">{o.items.length}</TableCell>
                    <TableCell className="font-semibold text-text-primary">{formatCurrency(Number(o.total))}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge[o.status] ?? 'neutral'}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-text-muted text-xs">{formatDateTime(o.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {next && (
                          <Button size="sm" variant="primary" onClick={() => updateStatus(o.id, next.status)}>
                            {next.label}
                          </Button>
                        )}
                        {(o.status === 'pending' || o.status === 'confirmed') && (
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(o.id, 'cancelled')}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
