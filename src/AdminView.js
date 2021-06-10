import React, { useState } from 'react';
import Nav from './Nav';
import AdminForm from './AdminForm';
import AdminList from './AdminList';

import data from './data';

export default function AdminView() {

	const placeHolders = data.users;

	const [ items, setItems ] = useState(placeHolders);

	console.table(placeHolders);
    console.table(items);

    const [ name, setName ] = useState("");
    const handleNameChange = event => {
        setName(event.target.value);
    };

    const [ price, setPrice ] = useState("");
    const handlePriceChange = event => {
        setPrice(event.target.value);
    };

    const [ image, setImage ] = useState("");
    const handleImageChange = event => {
        setImage(event.target.value);
    };

    const onSubmitChange = () => {
        setName("");
        setPrice("");
        setImage("");
    };

    const baseUrl = "https://source.unsplash.com/100x50/?"

    // stackoverflow 1337 developer - your code is now my property 
    function uuidv4() {
        console.log("generating uuid")
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const addNewItem =  () => {
        setItems([ ...items, { id: uuidv4(), name: name, price: Number(price), image: baseUrl + image, isAvailable: true }]);
    };

    const removeItem = removeId => {
        const updatedItems = items.filter((item) => item.id !== removeId);
        setItems(updatedItems);
    };


    const editItem = editId => {
        const updatedItems = items.filter((item) => item.id !== editId);
    }

    const toggleActive = activeId => {
        const updatedItems = items.map((item) => 
            item.id === activeId ? { ...item, isAvailable: !item.isAvailable } : item
        );
        setItems(updatedItems);
    }

    return (
        <>
            <Nav items={items}></Nav>
            <div className="app">
                <AdminForm name={name} price={price} image={image} addNewItem={addNewItem} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleImageChange={handleImageChange} onSubmitChange={onSubmitChange}></AdminForm>
                <AdminList items={items} removeItem={removeItem} editItem={editItem} toggleActive={toggleActive}></AdminList>
            </div>
        </>
    );
};
