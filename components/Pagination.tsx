import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog Pagination" className="flex justify-center gap-4 mt-12 mb-24">
      {page > 1 && (
        <Link
          href={page - 1 === 1 ? "/blog" : `/blog/page/${page - 1}`}
          rel="prev"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Prev
        </Link>
      )}

      <span className="px-4 py-2 bg-gray-100 rounded">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={`/blog/page/${page + 1}`}
          rel="next"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Next
        </Link>
      )}
    </nav>
  );
}