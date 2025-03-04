import React, { useState } from 'react';
import { Row } from '../types';
import { createRow, updateRow, deleteRow } from '../api/api';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

interface TableRowProps {
  eID: string;
  row: Row;
  updateLocalRows: (updatedRows: Row[]) => void;
}

const TableRow: React.FC<TableRowProps> = ({ eID, row, updateLocalRows }) => {
  const [isEditing, setIsEditing] = useState<boolean>(!!row.isEditing);
  const [title, setTitle] = useState<string>(row.title);
  const [value, setValue] = useState<number>(row.value);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        if (row.isNew) {
          const newRow = {
            parentId: row.parentId,
            title: title,
            value: value,
          };
          const updatedRows = await createRow(eID, newRow);
          updateLocalRows(updatedRows);
        } else {
          const updatedRow = {
            parentId: row.parentId,
            title: title,
            value: value,
          };
          const updatedRows = await updateRow(eID, row.id, updatedRow);
          updateLocalRows(updatedRows);
        }
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка сохранения строки', error);
      }
    }
  };

  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleAddChild = () => {
    if (isEditing) return;
    const newChild: Row = {
      id: `temp-${Date.now()}`,
      parentId: row.id,
      title: '',
      value: 0,
      isEditing: true,
      isNew: true,
    };
    updateLocalRows([newChild]);
  };

  const handleDelete = async () => {
    try {
      const updatedRows = await deleteRow(eID, row.id);
      updateLocalRows(updatedRows);
    } catch (error) {
      console.error('Ошибка удаления строки', error);
    }
  };

  return (
    <div className="table-row" onDoubleClick={handleDoubleClick}>
      <div className="cell title">
        {isEditing ? (
          <input
            type="text"
            value={title}
            placeholder="Введите заголовок"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span>{title || 'Без названия'}</span>
        )}
      </div>
      <div className="cell value">
        {isEditing ? (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className="cell actions">
        {}
        {!isEditing && (
          <>
            <AiOutlinePlus onClick={handleAddChild} title="Добавить потомка" style={{ cursor: 'pointer' }} />
            <AiOutlineDelete onClick={handleDelete} title="Удалить" style={{ cursor: 'pointer', marginLeft: '8px' }} />
          </>
        )}
      </div>
    </div>
  );
};

export default TableRow;
