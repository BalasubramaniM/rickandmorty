import React, { useEffect, useState } from "react";
import { number } from "prop-types";
import { Pagination } from "react-bootstrap";
import { PaginationContainer } from "./styles";

const PaginationComponent = ({ totalPages, getPage, currentPage }) => {
  const [page, setPage] = useState(currentPage);
  useEffect(() => {
    console.log("Mounted");
  }, []);

  const handleCurrentPage = number => {
    if (number <= totalPages && number >= 1) {
      setPage(number);
      getPage(number);
    }
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handleCurrentPage(number)}
        key={number}
        active={page === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <PaginationContainer>
      <Pagination>
        <Pagination.First onClick={() => handleCurrentPage(1)} />
        <Pagination.Prev onClick={() => handleCurrentPage(page - 1)} />
        {items}
        <Pagination.Next onClick={() => handleCurrentPage(page + 1)} />
        <Pagination.Last onClick={() => handleCurrentPage(totalPages)} />
      </Pagination>
    </PaginationContainer>
  );
};

PaginationComponent.propTypes = {
  totalPages: number
};

PaginationComponent.defaultProps = {
  totalPages: 1
};

export default PaginationComponent;
