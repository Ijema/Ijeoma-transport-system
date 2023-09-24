import React, { useState } from 'react';
import '../styles/home.css'
import CustomerDetails from '../components/customerDetails';
import Planner from '../components/planner';
import Footer from '../components/footer/footer'
import Header from '../components/header/header'
import { DragDropContext } from "react-beautiful-dnd";
import { DroppedItemsProvider } from '../components/DroppedItemsContext';


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
            <DroppedItemsProvider>
              <CustomerDetails onRowClick={handleRowClick} setDraggedItem={setDraggedItem}/>
              <Planner selectedRow={selectedRow} draggedItem={draggedItem} setDraggedItem={setDraggedItem}/>
            </DroppedItemsProvider>
          </div>
         <Footer />
        </div>
    </DragDropContext>
  );
};

export default Home;
