
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <nav className="flex items-center justify-center mt-6">
    <ul className="flex list-none">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <li
          key={pageNumber}
          className={`mr-2 ${pageNumber === currentPage ? 'text-white bg-blue-500' : 'text-blue-500 hover:bg-blue-200'}`}
        >
          <a
            href="#"
            className="px-4 py-2 block leading-none"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Pagination;
