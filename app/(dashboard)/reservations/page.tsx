'use client'
import { useEffect, useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import { CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import { TableEmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'

type Reservation = {
  id: number; name: string; email: string; phone: string
  date: string; time: string; guests: number; status: string; notes?: string | null
}

const statusBadge: Record<string, BadgeVariant> = {
  pending: 'pending',
  confirmed: 'completed',
  cancelled: 'cancelled',
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/reservations')
    setReservations(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  return (
    <div>
      <Topbar title="Reservations" />
      <div className="p-6">
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Contact</TableHeader>
              <TableHeader>Date &amp; Time</TableHeader>
              <TableHeader>Guests</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </TableHead>

          {loading ? (
            <TableRowSkeleton rows={5} cols={6} />
          ) : reservations.length === 0 ? (
            <TableEmptyState
              colSpan={6}
              icon={CalendarCheck}
              title="No reservations yet"
              description="Reservations submitted from the website will appear here."
            />
          ) : (
            <TableBody>
              {reservations.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-text-primary">{r.name}</TableCell>
                  <TableCell className="text-text-secondary">
                    <div>{r.phone}</div>
                    <div className="text-xs text-text-muted">{r.email}</div>
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {formatDate(r.date)} &middot; {r.time}
                  </TableCell>
                  <TableCell className="text-text-muted">{r.guests}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadge[r.status] ?? 'neutral'}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {r.status === 'pending' && (
                        <>
                          <Button size="sm" variant="primary" onClick={() => updateStatus(r.id, 'confirmed')}>
                            Confirm
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(r.id, 'cancelled')}>
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}
