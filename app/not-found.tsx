import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Wondering in the KastoChha Valley?</h2>
      <p className="text-gray-600 mb-8">
        Even Habre Dai couldn't find this page. Let's get you back on track.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Return to KastoChha Home
      </Link>
    </div>
  )
}