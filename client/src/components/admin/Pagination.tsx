import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface PaginationProps {
    currentPage: number,
    totalPages: number,
    baseUrl: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function Pagination({ currentPage, totalPages, baseUrl, setCurrentPage }: PaginationProps) {

    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        //adjust start page if we near the end
        if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages;
    }

    const pageNumbers = generatePageNumbers();

    return (
        <div className='flex items-center gap-2'>
            {currentPage > 1 && (
                <Button
                    variant="outline"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <ChevronLeft className="size-5" />
                </Button>
            )}

            {pageNumbers.map((page) => (
                <Button
                    variant={page === currentPage ? "default" : "outline"}
                    className={`${page === currentPage
                        ? 'bg-violet-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                    onClick={() => setCurrentPage(page)}
                    key={page}
                >
                    {page}
                </Button>
            ))}


            {/* Next Button */}
            {currentPage < totalPages && (
                <Button
                    variant="outline"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <ChevronRight className="size-5" />
                </Button>
            )}
        </div>
    )
}

export default Pagination