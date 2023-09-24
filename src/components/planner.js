import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import '../styles/home.css';
// import { json } from 'react-router-dom';


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

const Planner = ({ onDropCustomer,draggedItem }) => {
  const [data, setData] = useState(initialData);

  useEffect(()=>{
    //checking browser storage for saved data
    if(localStorage.getItem("my-db") !== null || undefined){
      const data = localStorage.getItem("my-db")
      setData(JSON.parse(data))
    }
  },[])

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, date, slot) => {
    e.preventDefault();
    const myData = [...data]

    let current = myData.find(e=>{return e.date===date})
    const index = myData.indexOf(current)
    current[slot] = {id:draggedItem.id,name:draggedItem.name}

    myData[index] = current
    
    setData(myData)

    //save data to browser localStorage
    localStorage.setItem('my-db',JSON.stringify(myData))
  };

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
        onDrop: (e) => {
          // Handle your event here
          handleDrop(e,row.date,"slot1")
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
        onDrop: (e) => {
          // Handle your event here
          handleDrop(e,row.date,"slot2")
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
        onDrop: (e) => {
          // Handle your event here
          handleDrop(e,row.date,"slot3")
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
        onDrop: (e) => {
          // Handle your event here
          handleDrop(e,row.date,"slot4")
        },
      }),
      render: (data) => <div>{data.name}</div>,
    },
  ];

  return (
    <div className='right-content'>
      <h2>Planner</h2>
      <Droppable droppableId="planner" type="CUSTOMER">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            onDragOver={onDragOver}
            onDrop={null}
          >
            <Table
              columns={columns}
              showHeader={true}
              dataSource={data}
              rowKey={(record) => record.date}
              rowClassName={() => 'planner-row'} // Add this line to style the Planner row
            />
          </div> 
        )}
      </Droppable>
    </div>
  );
};

export default Planner;
