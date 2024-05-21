const Pagination = ({ offset, limit, totalData, onPageChange }) => {
    
    const totalPages = Math.ceil(totalData / limit);
    const currentPage = offset + 1;
    let pages = []
    if (totalPages <= 4) pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    else 
    {
        if (currentPage <= 2) pages = [1,2,3,totalPages]
        else if (currentPage >= totalPages-1) pages = [1,totalPages - 2, totalPages - 1, totalPages]
        else pages = [1,currentPage-1, currentPage, currentPage+1, totalPages]

        if (pages[1] >= 3) pages.splice(1,0,"...")
        if (pages[pages.length - 2] <= totalPages - 2) pages.splice(-1,0,"...")
    }
    if (!totalData) return <></>;
    return (
        <div className="flex justify-end gap-2 mt-4">
            <button
                onClick={() => onPageChange(offset - 1)}
                disabled={currentPage === 1}
                className={"px-3 py-1 text-sm rounded-md bg-white " + (currentPage !== 1 ? "text-primary" :"")}
            >
                Prev
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => page !== "..." ? onPageChange(page-1) : ""}
                    className={`px-3 py-1 text-sm rounded-md ${
                        page === currentPage
                            ? "bg-primary text-white"
                            : "bg-white text-primary"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(offset + 1)}
                disabled={currentPage === totalPages}
                className={"px-3 py-1 text-sm rounded-md bg-white " + (currentPage !== totalPages ? "text-primary" :"")}
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;