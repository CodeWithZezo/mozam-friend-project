import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-spice-400/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-spice-400 text-2xl font-bold">!</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
        <p className="text-text-muted mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/dashboard" className="bg-spice-400 text-surface-0 px-6 py-2 rounded-lg text-sm font-medium hover:bg-spice-300 transition">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
