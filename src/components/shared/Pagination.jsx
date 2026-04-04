import usePagination from '@/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

    const allPages = usePagination({totalPages, currentPage})

    return (
        <div className='mt-4 mb-2 flex flex-wrap justify-center items-center xs:text-sm md:text-base gap-1'>
            
            {/* Previous Button */}
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className={`flex items-center md:gap-2 p-2 ${currentPage === 1 ? 'text-gray-400 cursor-default' : 'text-[#0F62FE] cursor-pointer'} `}
            >
                <ChevronLeft size={18} />
                <span className='font-medium max-sm:hidden'>Previous</span>
            </button>

            {/* Page Numbers & Dots */}
            {allPages.map((page, index) => {
                const isDot = page === '...';
                const isActive = page === currentPage;

                return (
                    <button
                        key={index}
                        disabled={isDot}
                        onClick={() => !isDot && onPageChange(page)}
                        className={`size-6 md:size-8 flex justify-center items-center transition-all
                            ${isDot ? 'text-gray-500 cursor-default' : 'text-[#0F62FE] border border-transparent'}
                            ${isActive ? 'bg-[#A6C8FF] font-bold border-[#0F62FE]' : !isDot && 'hover:bg-gray-100 cursor-pointer'}
                        `}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className={`flex items-center md:gap-2 p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-default' : 'text-[#0F62FE] cursor-pointer'} `}
            >
                <span className='font-medium max-sm:hidden'>Next</span>
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;