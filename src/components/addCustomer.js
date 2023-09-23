// AddCustomerModal.js
import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

const AddCustomerModal = ({ addCustomerDetails, lastCustomerId }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleAddCustomer = () => {
    // Calculate the next integer ID
    const newCustomerId = lastCustomerId + 1;

    const newCustomer = {
      id: newCustomerId,
      name,
      address1: pickupLocation,
      address2: dropOffLocation,
    };
    
    addCustomerDetails(newCustomer); // Call the addCustomer function with the new customer

    // Clear the form input values and close the modal
    setName("");
    setPickupLocation("");
    setDropOffLocation("");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Customer
      </Button>
      <Modal
        title="Add Customer Details"
        visible={open}
        onOk={handleAddCustomer}
        onCancel={hideModal}
        okText="Add"
        cancelText="Cancel"
      >
        <div className='add-customer-form'>
          <form>
            <div><label>Customer's Name: </label><Input type='text' value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><label>Customer's Pickup Location: </label><Input type='text' value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} /></div>
            <div><label>Customer's Drop off Location: </label><Input type='text' value={dropOffLocation} onChange={(e) => setDropOffLocation(e.target.value)} /></div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddCustomerModal;
