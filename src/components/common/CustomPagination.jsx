import { useState, useEffect } from "react";
import { PaginationButtons, PaginationButton } from "./Common.styles";

const Pagination = ({ page, pages, setPage }) => {
    const [windowStart, setWindowStart] = useState(1);
    const pageNumbLimit = 5;
    const siblingCount = 1;
    
    // Calculate visible pages whenever page or total pages change
    useEffect(() => {
        // Don't adjust if we don't have enough pages
        if (pages <= pageNumbLimit) return;
        
        // Current page is in first section
        if (page <= pageNumbLimit - siblingCount) {
            setWindowStart(1);
        } 
        // Current page is in last section
        else if (page > pages - (pageNumbLimit - siblingCount)) {
            setWindowStart(pages - pageNumbLimit + 1);
        }
        // Current page is in middle section
        else if (
            page > windowStart + pageNumbLimit - siblingCount - 1 || 
            page < windowStart + siblingCount
        ) {
            setWindowStart(page - Math.floor(pageNumbLimit / 2));
        }
    }, [page, pages]);

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < pages) setPage(page + 1);
    };

    const handlePgClick = (number) => setPage(number);

    // Calculate visible page numbers
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const end = Math.min(windowStart + pageNumbLimit - 1, pages);
        
        for (let i = windowStart; i <= end; i++) {
            pageNumbers.push(
                <PaginationButton 
                    key={i}
                    className={page === i ? 'activePage numbers-btn' : 'numbers-btn'}
                    onClick={() => handlePgClick(i)}
                >
                    {i}
                </PaginationButton>
            );
        }
        return pageNumbers;
    };

    // Show left ellipsis only when window doesn't start at 1
    const showLeftEllipsis = pages > pageNumbLimit && windowStart > 1;
    // Show right ellipsis only when window doesn't reach last page
    const showRightEllipsis = pages > pageNumbLimit && windowStart + pageNumbLimit <= pages;

    return (
        <PaginationButtons>
            <PaginationButton 
                onClick={handlePrev} 
                disabled={page === 1}
                aria-label="Previous page"
                $disabled={page === 1 ? "true" : undefined}
            >
                &larr; Précédent
            </PaginationButton>
            
            {showLeftEllipsis && (
                <PaginationButton className="numbers-btn" disabled>
                    &hellip;
                </PaginationButton>
            )}
            
            {renderPageNumbers()}
            
            {showRightEllipsis && (
                <PaginationButton className="numbers-btn" disabled>
                    &hellip;
                </PaginationButton>
            )}
            
            <PaginationButton 
                onClick={handleNext} 
                disabled={page === pages}
                aria-label="Next page"
                $disabled={pages === pages ? "true" : undefined}
            >
                Suivant &rarr;
            </PaginationButton>
        </PaginationButtons>
    );
};

export default Pagination;