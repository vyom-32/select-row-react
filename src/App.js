import React, { useState } from 'react';
import './App.css';

function App(){
  const rows = ['Row1', 'Row2', 'Row3', 'Row4', 'Row5', 'Row6'];
  const [selectedRows, setSelectedRows] = useState([]);
  const [baseRow, setBaseRow] = useState(null);

  const handleCheckboxChange = (row) => {
    let updatedRows;
    if (selectedRows.includes(row)) {
      updatedRows = selectedRows.filter((r) => r !== row);
    } else {
      updatedRows = [...selectedRows, row];
    }
    setSelectedRows(updatedRows);

    // Update base row logic
    if (updatedRows.length > 0 && (!baseRow || baseRow == row)) {
      setBaseRow(updatedRows[0]); // First selected row as Base Row
    } else if(!updatedRows.length) {
      setBaseRow(null); // Clear base row if no rows selected
    }
  };

  const handleBaseRowChange = (e) => {
    setBaseRow(e.target.value);
  };

  return (
    <div className='App'>
      <header >
        <h2 className='text-center'>RowSelect</h2>
      </header>
      <div className='d-flex items-center justify-center gap-100'>
      <table border="1" className='border-collapse'>
        <thead>
          <tr>
            <th>Select Rows</th>
            <th>Row</th>
            <th>Base Row</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleCheckboxChange(row)}
                />
              </td>
              <td>{row}</td>
              <td>{baseRow === row ? 'Base Row' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label>Base Row: </label>
        <select value={baseRow || ''} onChange={handleBaseRowChange} disabled={selectedRows.length === 0}>
          {selectedRows.map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
};

export default App;
