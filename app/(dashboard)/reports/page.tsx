import { prisma } from '@/lib/db'
import Topbar from '@/components/layout/Topbar'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { XCircle, RotateCcw } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

async function getReportData() {
  const [ordersByStatus, revenue, recentReturns, recentCancellations] = await Promise.all([
    prisma.order.groupBy({ by: ['status'], _count: true }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: 'completed' } }),
    prisma.orderReturn.findMany({ take: 5, orderBy: { returnedAt: 'desc' }, include: { order: true } }),
    prisma.orderCancellation.findMany({ take: 5, orderBy: { cancelledAt: 'desc' }, include: { order: true } }),
  ])
  return { ordersByStatus, revenue, recentReturns, recentCancellations }
}

const statusBadge: Record<string, BadgeVariant> = {
  pending: 'pending',
  completed: 'completed',
  cancelled: 'cancelled',
  returned: 'returned',
}

const statusIcon: Record<string, string> = {
  pending: '⏳',
  completed: '✓',
  cancelled: '✕',
  returned: '↩',
}

export default async function ReportsPage() {
  const { ordersByStatus, revenue, recentReturns, recentCancellations } = await getReportData()
  const totalOrders = ordersByStatus.reduce((s, o) => s + o._count, 0)
  const revenueTotal = Number(revenue._sum.total ?? 0)

  return (
    <div>
      <Topbar title="Reports" />
      <div className="p-6 space-y-6">

        {/* Revenue hero card */}
        <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-400/25 rounded-2xl p-6">
          <p className="text-sm font-medium text-green-400 mb-1">Total Revenue — Completed Orders</p>
          <p className="text-4xl font-bold text-green-400">{formatCurrency(revenueTotal)}</p>
          <p className="text-xs text-green-400/70 mt-2">All time · {totalOrders} total orders</p>
        </div>

        {/* Orders by status */}
        <div>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Orders by Status</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ordersByStatus.map(o => {
              const pct = totalOrders > 0 ? Math.round(o._count / totalOrders * 100) : 0
              return (
                <div key={o.status} className="bg-surface-1 rounded-xl p-5 border border-border-subtle shadow-(--shadow-card) hover:shadow-(--shadow-card-hover) transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-text-muted capitalize">{o.status}</p>
                    <Badge variant={statusBadge[o.status] ?? 'neutral'}>
                      {statusIcon[o.status]} {pct}%
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold text-text-primary">{o._count}</p>
                  <div className="mt-3 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-spice-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cancellations & Returns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cancellations */}
          <div className="bg-surface-1 rounded-xl border border-border-subtle shadow-(--shadow-card) overflow-hidden">
            <div className="px-5 py-4 border-b border-border-subtle flex items-center gap-2">
              <XCircle size={15} className="text-red-400" />
              <h3 className="font-semibold text-text-secondary text-sm">Recent Cancellations</h3>
            </div>
            {recentCancellations.length === 0 ? (
              <EmptyState icon={XCircle} title="No cancellations" description="Cancelled orders will appear here." className="py-10" />
            ) : (
              <div className="divide-y divide-border-subtle">
                {recentCancellations.map(c => (
                  <div key={c.id} className="px-5 py-3.5">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-text-secondary text-sm">Order #{c.orderId}</span>
                      <span className="text-text-muted text-xs">{formatDate(new Date(c.cancelledAt))}</span>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2">{c.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Returns */}
          <div className="bg-surface-1 rounded-xl border border-border-subtle shadow-(--shadow-card) overflow-hidden">
            <div className="px-5 py-4 border-b border-border-subtle flex items-center gap-2">
              <RotateCcw size={15} className="text-purple-400" />
              <h3 className="font-semibold text-text-secondary text-sm">Recent Returns</h3>
            </div>
            {recentReturns.length === 0 ? (
              <EmptyState icon={RotateCcw} title="No returns" description="Returned orders will appear here." className="py-10" />
            ) : (
              <div className="divide-y divide-border-subtle">
                {recentReturns.map(r => (
                  <div key={r.id} className="px-5 py-3.5">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-text-secondary text-sm">Order #{r.orderId}</span>
                      <span className="text-red-400 text-xs font-semibold">- {formatCurrency(Number(r.refundAmount))}</span>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2">{r.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
