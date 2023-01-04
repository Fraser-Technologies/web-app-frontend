import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  handlePageClick,
  pageCount,
}: {
  handlePageClick: any;
  pageCount: any;
}) => {
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page

  return (
    <div className="mb-4 bg-gray-200 rounded-md px-6">
      <ReactPaginate
        className="w-full inline-flex py-2 items-center"
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageLinkClassName={
          "page-link px-3 py-2 mx-2 leading-tight text-gray-800 rounded-md"
        }
        activeClassName={" bg-gray-300 rounded-md"}
        previousClassName={"previous mr-6"}
        nextClassName={"next ml-6"}
        previousLabel={"<"}
        nextLabel={">"}
      />
    </div>
  );
};

export default Pagination;
