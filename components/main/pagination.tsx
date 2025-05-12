"use client"

import { MoveLeft, MoveRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push("...")
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...")
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {/* Previous page button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`border rounded-md px-2 lg:px-4 py-1 lg:py-2 flex items-center justify-center ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
          }`}
        aria-label="Previous page"
      >
        <MoveLeft className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      {/* Page numbers - hide some on very small screens */}
      <div className="hidden xs:flex items-center space-x-1 lg:space-x-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 lg:px-2">
              ...
            </span>
          ) : (
            <button
              aria-label={`Go to page ${page}`}
              key={`page-${page}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center rounded-md ${currentPage === page ? "bg-dark text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Simple indicator for very small screens */}
      <div className="xs:hidden flex items-center">
        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>
      </div>

      {/* Next page button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`border rounded-md px-2 lg:px-4 py-1 lg:py-2 flex items-center justify-center ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
          }`}
        aria-label="Next page"
      >
        <MoveRight className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  )
}
