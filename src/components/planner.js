import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Menu } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import '../styles/home.css';

const currentDate = new Date();
const initialData = [];

for (let i = 0; i <= 6; i++) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() + i);
  initialData.push({
    date: date.toDateString(),
    slot1: { id: null, name: '' },
    slot2: { id: null, name: '' },
    slot3: { id: null, name: '' },
    slot4: { id: null, name: '' },
  });
}

const Planner = ({ onDropCustomer, draggedItem }) => {
  const [data, setData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Checking browser storage for saved data
    if (localStorage.getItem('my-db') !== null || undefined) {
      const storedData = localStorage.getItem('my-db');
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleDrop = (e, date, slot) => {
    e.preventDefault();
    const myData = [...data];
  
    let current = myData.find((e) => e.date === date);
    const index = myData.indexOf(current);
  
    if (current[slot].id !== null) {
      setErrorMessage('Slot already occupied');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
  
    current[slot] = { id: draggedItem.id, name: draggedItem.name };
  
    // Remove the item from source slot if it exists
    const sourceSlot = myData.find((e) => e.date === draggedItem.date);
    if (sourceSlot) {
      sourceSlot[draggedItem.slot] = { id: null, name: '' };
    }
  
    myData[index] = current;
    setData(myData);
  
    // Save data to browser localStorage
    localStorage.setItem('my-db', JSON.stringify(myData));
  
    // Remove the item from localStorage
    localStorage.removeItem(draggedItem.id);
  };

  const handleDeleteSlot = (date, slot) => {
    const myData = [...data];
    let current = myData.find((e) => e.date === date);
    const index = myData.indexOf(current);
    current[slot] = { id: null, name: '' };
    myData[index] = current;
    setData(myData);
    localStorage.setItem('my-db', JSON.stringify(myData));
  };

  const handleDeleteActions = (date) => (
    <Menu onClick={({ key }) => handleDeleteSlot(date, key)}>
      <Menu.Item key="slot1">Delete Slot 1</Menu.Item>
      <Menu.Item key="slot2">Delete Slot 2</Menu.Item>
      <Menu.Item key="slot3">Delete Slot 3</Menu.Item>
      <Menu.Item key="slot4">Delete Slot 4</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <a href="./">{text}</a>,
    },
    {
      title: 'Slot1',
      className: 'column-slot',
      dataIndex: 'slot1',
      align: 'right',
      onCell: (row) => ({
        onDragOver: (e) => {
          handleDragOver(e);
        },
        onDrop: (e) => {
          handleDrop(e, row.date, 'slot1');
        },
      }),
      render: (data) => <div>{data.name}</div>,
    },
    {
      title: 'Slot2',
      className: 'column-slot',
      dataIndex: 'slot2',
      align: 'right',
      onCell: (row) => ({
        onDragOver: (e) => {
          handleDragOver(e);
        },
        onDrop: (e) => {
          handleDrop(e, row.date, 'slot2');
        },
      }),
      render: (data) => <div>{data.name}</div>,
    },
    {
      title: 'Slot3',
      className: 'column-slot',
      dataIndex: 'slot3',
      align: 'right',
      onCell: (row) => ({
        onDragOver: (e) => {
          handleDragOver(e);
        },
        onDrop: (e) => {
          handleDrop(e, row.date, 'slot3');
        },
      }),
      render: (data) => <div>{data.name}</div>,
    },
    {
      title: 'Slot4',
      className: 'column-slot',
      dataIndex: 'slot4',
      align: 'right',
      onCell: (row) => ({
        onDragOver: (e) => {
          handleDragOver(e);
        },
        onDrop: (e) => {
          handleDrop(e, row.date, 'slot4');
        },
      }),
      render: (data) => <div>{data.name}</div>,
    },
    {
      title: 'Delete',
      dataIndex: 'date',
      render: (date) => (
        <Dropdown overlay={handleDeleteActions(date)}>
          <a className="ant-dropdown-link" href='./' onClick={(e) => e.preventDefault()}>
            Delete
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className='right-content'>
      <h2>Planner</h2>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      <Droppable droppableId='planner' type='CUSTOMER'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Table
              columns={columns}
              showHeader={true}
              dataSource={data}
              rowKey={(record) => record.date}
              rowClassName={() => 'planner-row'} 
            />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Planner;
