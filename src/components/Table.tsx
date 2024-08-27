import { Edit, Trash } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface TableColumn {
  header: string;
  key: string;
  url?: boolean;
  width?: string;
  date?: boolean;
}

interface TableRow {
  [key: string]: string;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  onEdit?: (data: unknown) => void;
  onDelete?: (data: unknown) => void;
  rowsPerPage?: number; // Add optional prop to set rows per page
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  rowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes for slicing data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderTd = (column: TableColumn, row: TableRow) => {
    if (column.url) {
      return (
        <Link to={row[column.key]} target="_blank">
          URL
        </Link>
      );
    } else if (column.date) {
      return moment(row[column.key]).format("MMMM Do YYYY, h:mm a");
    } else return row[column.key];
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="max-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 border-b border-gray-300 text-left"
                style={{ maxWidth: column.width }}
              >
                {column.header}
              </th>
            ))}
            <th
              className="py-2 px-4 border-b border-gray-300 text-left"
              style={{
                width: "100%",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-4 border-b border-gray-300"
                  style={{ width: column.width }}
                >
                  {renderTd(column, row)}
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-300">
                <div className="flex gap-4">
                  <Edit
                    width={20}
                    className="text-primary cursor-pointer"
                    onClick={() => onEdit && onEdit(row)}
                  />
                  <Trash
                    width={20}
                    className="cursor-pointer"
                    onClick={() => onDelete && onDelete(row)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === page ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
