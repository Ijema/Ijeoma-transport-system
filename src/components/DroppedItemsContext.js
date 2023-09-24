// DroppedItemsContext.js
import React, { createContext, useContext, useState } from 'react';

const DroppedItemsContext = createContext();

export function DroppedItemsProvider({ children }) {
  const [droppedItems, setDroppedItems] = useState([]);

  const addDroppedItem = (item) => {
    setDroppedItems([...droppedItems, item]);
  };

  const removeDroppedItem = (itemId) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== itemId));
  };

  return (
    <DroppedItemsContext.Provider
      value={{ droppedItems, addDroppedItem, removeDroppedItem }}
    >
      {children}
    </DroppedItemsContext.Provider>
  );
}

export function useDroppedItems() {
  return useContext(DroppedItemsContext);
}
