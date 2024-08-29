import { CircleX, Edit, Trash } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import { ClearButton, EditButton } from "./Buttons/Button";

interface TableColumn {
  header: string;
  key: string;
  url?: boolean;
  width?: string;
  date?: boolean;
  nowrap?: boolean;
}

interface TableRow {
  [key: string]: any;
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
  const [showForm, setShowForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<TableRow | null>(null);

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

  if (!data) return null;

  const handleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDelete = (row: TableRow) => {
    setRowToDelete(row); // Set the row to be deleted
    handleForm(); // Open the confirmation modal
  };

  const confirmDelete = () => {
    if (onDelete && rowToDelete) {
      onDelete(rowToDelete); // Pass the row to onDelete
    }
    handleForm(); // Close the confirmation modal
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 border-b border-gray-300 text-left"
                style={{ width: column.width }}
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
                  className={`py-2 px-4 border-b border-gray-300 text-sm ${
                    column.nowrap && "text-nowrap"
                  }`}
                  style={{ width: column.width }}
                >
                  {renderTd(column, row)}
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-300">
                <div className="flex gap-2">
                  <EditButton
                    onClick={() => onEdit && onEdit(row)}
                    type="button"
                  >
                    <Edit width={15} className="text-white cursor-pointer" />
                  </EditButton>
                  {/* <Edit
                    width={15}
                    className="text-primary cursor-pointer"
                    onClick={() => onEdit && onEdit(row)}
                  /> */}
                  <ClearButton
                    type="button"
                    onClick={() => {
                      handleDelete(row);
                    }}
                  >
                    <Trash width={15} className="text-white cursor-pointer" />
                  </ClearButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete confirmation popup start */}
      <Modal
        show={showForm}
        close={handleForm}
        outsideClose={true}
        width="500px"
      >
        <ConfirmationModal
          title="Are you sure you want to delete?"
          icon={<CircleX width={120} height={120} className="text-red-300" />}
          close={handleForm}
          confirmBtnName="Delete"
          confirmBtnClick={confirmDelete}
        />
      </Modal>
      {/* Delete confirmation popup end */}
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
