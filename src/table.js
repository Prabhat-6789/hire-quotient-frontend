import React, { useState, useEffect } from 'react';
import TableRow from './tableRow';
import './table.css';

const Table = ({ data,visibleData=[],setVisibleData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [saveTrigger, setSaveTrigger] = useState(false);
  const rowsPerPage = 5;
  //const [stateArray,setStateArray] = useState([]);
  
  const itemsPerGroup = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

const MAX_PAGINATION_BUTTONS = 4; // Adjust this number based on your preference

const paginationButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

const startPage = Math.max(currentPage - Math.floor(MAX_PAGINATION_BUTTONS / 2), 1);
const endPage = Math.min(startPage + MAX_PAGINATION_BUTTONS - 1, totalPages);

const visiblePaginationButtons = paginationButtons.slice(startPage - 1, endPage);
 
  const handleEdit = (editedRow) => {
    setEditedData(editedRow);
    setEditing(true);
    const filteredData = visibleData[currentPage-1].filter((data)=> data.id !== editedRow.id);
    const updatedData = [editedRow,...filteredData];
    const sortedArray = updatedData.sort((a, b) => a.id - b.id);
    setVisibleData((prevPageData) => {
      const newData = [...prevPageData];
      newData[currentPage - 1] = sortedArray;
      return newData;
    });
  };

  const handleSave = () => {
    // Update the data state to reflect changes
    const updatedData = visibleData[currentPage-1]?.map(row => (row.id === editedData.id ? editedData : row));

    // Update the visibleData state to reflect changes and pagination
    //setVisibleData(updatedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));

    setEditing(false);
    setSaveTrigger(!saveTrigger);
  };

  const handleDelete = () => {
    // Update the data state to reflect changes
    const updatedData = visibleData[currentPage-1].filter(row => !selectedRows.includes(row.id));

    //Update the visibleData state to reflect changes and pagination
    //setVisibleData(updatedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
    setVisibleData((prevPageData) => {
      const newData = [...prevPageData];
      newData[currentPage - 1] = updatedData;
      return newData;
    });

    setSelectedRows([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleToggleAllRows = () => {
    const allRows = visibleData[currentPage-1].map(row => row.id);
    if (selectedRows.length === allRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allRows);
    }
  };

  return (
    visibleData.length>0 && 
    <div>
      {/*
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
  */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === visibleData[currentPage-1]?.length}
                onChange={handleToggleAllRows}
              />
            </th>
            {Object.keys(data[0] || {}).map(column => (
              <th key={column}>{column}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {visibleData[currentPage-1].map(row => (
            <TableRow
              key={row.id}
              row={row}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          ))}
        </tbody>
      </table>
      <div className="pagination">
  <button onClick={handleFirstPage}>&lt;&lt;</button>
  <button onClick={handlePrevPage}>&lt;</button>
  {visiblePaginationButtons.map((button) => (
    <button
      key={button}
      onClick={() => handlePageChange(button)}
      className={button === currentPage ? 'active' : ''}
    >
      {button}
    </button>
  ))}
  <button onClick={handleNextPage}>&gt;</button>
  <button onClick={handleLastPage}>&gt;&gt;</button>
</div>
      <button className="delete-selected" onClick={handleDelete}>
        Delete Selected
      </button>
  
    </div>
  );
};

export default Table; 