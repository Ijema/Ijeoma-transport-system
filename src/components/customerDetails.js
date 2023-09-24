import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './home/home.css';
import AddCustomerModal from './addCustomer';

const Info = [
  {
    id: 1,
    name: 'Ozioma',
    address1: 32,
    address2: 'New York No. 1 Lake Park',
  },
  {
    id: 2,
    name: 'Jim Green',
    address1: 42,
    address2: 'London No. 1 Lake Park',
  },
  {
    id: 3,
    name: 'Joe Black',
    address1: 32,
    address2: 'Sydney No. 1 Lake Park',
  },
];

const CustomerDetails = ({ onDragEnd, setDraggedItem }) => {
  const [data, setData] = useState(
    Info.map((e, index) => ({
      id: e.id,
      name: e.name,
      address1: e.address1,
      address2: e.address2,
      delete: e.id, // Add 'delete' property with the same value as 'id'
    }))
  );

  const addCustomerDetails = (newCustomer) => {
    setData((prevData) => [...prevData, { ...newCustomer, delete: newCustomer.id }]);
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedData = data.filter((customer) => customer.id !== customerId);
    setData(updatedData);
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pickup Location',
      dataIndex: 'address1',
      key: 'address1',
    },
    {
      title: 'Drop off Location',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: 'Action',
      dataIndex: 'delete', // Use 'delete' as dataIndex
      key: 'x',
      render: (_, record) => (
        <span onClick={() => handleDeleteCustomer(record.id)} className="delete-button">
          Delete
        </span>
      ),
    },
  ];

  const lastCustomerId = data.length > 0 ? data[data.length - 1].id : 0;

  return (
    <div className="left-content">
      <DragDropContext onDragEnd={onDragEnd} className="left-content">
        <Droppable droppableId="customers" type="CUSTOMER">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} id="custom-table">
              <div className='customer-details-section'>
                <h3>Customer Details</h3>
                <div>
                  <AddCustomerModal addCustomerDetails={addCustomerDetails} lastCustomerId={lastCustomerId} />
                </div>
              </div>  
              <table>
                <thead>
                <tr>
                  {columns.map(col => <th key={col.key}>{col.title}</th>)}
                </tr>
                </thead>
                {data.map(row => (
                  <tr draggable key={"row_" + row.id} onDragStart={() => { setDraggedItem(row) }}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.address1}</td>
                    <td>{row.address2}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CustomerDetails;
