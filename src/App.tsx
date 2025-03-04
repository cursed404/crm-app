// src/App.tsx
import React, { useEffect, useState } from 'react';
import { createEntity, getRows } from './api/api';
import { Row } from './types';
import Table from './components/Table';
import './styles/main.scss';

const ENTITY_KEY = 'outlayEntityId';

const App: React.FC = () => {
  const [eID, setEID] = useState<string>('');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let entityId = localStorage.getItem(ENTITY_KEY);
        if (!entityId) {
          entityId = await createEntity();
          localStorage.setItem(ENTITY_KEY, entityId);
        }
        setEID(entityId);

        const data = await getRows(entityId);
        if (!data || data.length === 0) {
          setRows([{
            id: 'temp',
            parentId: null,
            title: '',
            value: 0,
            isEditing: true,
            isNew: true,
          }]);
        } else {
          setRows(data);
        }
      } catch (error) {
        console.error('Ошибка инициализации', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const updateLocalRows = (updatedRows: Row[]) => {
    setRows(prevRows => {
      const rowsMap = new Map<string, Row>();
      prevRows.forEach(row => rowsMap.set(row.id, row));
      updatedRows.forEach(row => rowsMap.set(row.id, row));
      return Array.from(rowsMap.values());
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="app-container">
      <Table eID={eID} rows={rows} updateLocalRows={updateLocalRows} />
    </div>
  );
};

export default App;
