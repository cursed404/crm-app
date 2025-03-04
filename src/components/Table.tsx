// src/components/Table.tsx
import React from 'react';
import { Row } from '../types';
import TableRow from './TableRow';

interface TableProps {
  eID: string;
  rows: Row[];
  updateLocalRows: (updatedRows: Row[]) => void;
}

const Table: React.FC<TableProps> = ({ eID, rows, updateLocalRows }) => {

  return (
    <div className="table">
      <div className="table-header">
        <div>Заголовок</div>
        <div>Значение</div>
        <div>Действия</div>
      </div>
      <div className="table-body">
        {rows.map(row => (
          <TableRow key={row.id} row={row} eID={eID} updateLocalRows={updateLocalRows} />
        ))}
      </div>
    </div>
  );
};

export default Table;
