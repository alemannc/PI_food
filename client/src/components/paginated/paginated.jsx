import React from "react";
import "./paginated.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); //Creanis un array que contenga los numeros de la pagina 

  // Calcula los números de página a mostrar (máximo 3)
  const visiblePageNumbers = pageNumbers.slice(// Metodo slice para obtener un sub array de paginas
    Math.max(0, currentPage - 2),// mathMax para que nunca sea menor que 0 el indice de la pagina
    Math.min(pageNumbers.length, currentPage + 1)//MathMin para que nunca tengamos mas numeros de los que tiene de indice el array pageNumbers
  );

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {visiblePageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
