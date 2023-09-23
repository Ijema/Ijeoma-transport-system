import React, { useState } from 'react';
import './home.css';
import CustomerDetails from '../customerDetails';
import Planner from '../planner';
import Footer from '../footer/footer'
import Header from '../header/header'
import { DragDropContext } from "react-beautiful-dnd";

const Home = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [draggedItem,setDraggedItem] = useState(null)

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      
        <div className='body'>
          <Header />
          <p className='note'><span>NB:</span>To assign customers slots, please drag and drop the customer details to the respective slot.</p>
          <div className='content-container'>
              <CustomerDetails onRowClick={handleRowClick} setDraggedItem={setDraggedItem}/>
              <Planner selectedRow={selectedRow} draggedItem={draggedItem} setDraggedItem={setDraggedItem}/>
          </div>
         <Footer />
        </div>
    </DragDropContext>
  );
};

export default Home;
