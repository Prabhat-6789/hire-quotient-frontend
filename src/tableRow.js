import React, { useState } from 'react';

const TableRow = ({ row, selectedRows, setSelectedRows, isEditing, onEdit, onSave }) => {
  const [editedValues, setEditedValues] = useState({ ...row });
  const isSelected = selectedRows.includes(row.id);

  const handleEdit = (tempRow) => {
    onEdit(tempRow);
  };

  const handleSave = () => {
    onSave();
  };

  const handleToggleRow = () => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(row.id)) {
        return prevSelectedRows.filter(id => id !== row.id);
      } else {
        return [...prevSelectedRows, row.id];
      }
    });
  };

  const handleChange = (column, value) => {
    setEditedValues(prevEditedValues => ({
      ...prevEditedValues,
      [column]: value,
    }));
    console.log("edited values:",editedValues);
  };

  return (
    <tr className={isSelected ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggleRow}
        />
      </td>
      {Object.keys(row).map(column => (
        <td key={column}>
          {isEditing ? (
            <input
              type="text"
              value={editedValues[column]}
              onChange={(e) => handleChange(column, e.target.value)}
            />
          ) : (
            row[column]
          )}
        </td>
      ))}
      <td>
        {isEditing ? (
          <button onClick={() => handleSave(editedValues)}>Save</button>
        ) : (
          <button onClick={() => handleEdit(editedValues)}>Edit</button>
        )}
      </td>
      <td>
        {!isEditing ? (
          <button className="delete" onClick={() => setSelectedRows([row.id])}>
            Delete
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default TableRow;