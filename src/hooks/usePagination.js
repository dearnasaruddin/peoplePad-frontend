const usePagination = ({ totalPages, currentPage, gap = 1 }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {

        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - gap && i <= currentPage + gap)
        ) {
            pages.push(i);
        }

        else if (
            i === currentPage - gap - 1 ||
            i === currentPage + gap + 1
        ) {
            pages.push('...');
        }
    }
    return pages;
}

export default usePagination