import { useState } from 'react';

const AddLogs = ({ onLogAdded }) => {
    const [form, setForm] = useState({
        placeName: "",
        description: "",
        latitude: "",
        longitude: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            const newLog = await response.json();
            onLogAdded(newLog);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name='place_name' placeholder='Place Name' onChange={handleChange} required/>
            <input name='description' placeholder='Description' onChange={handleChange} required/>
            <button type='submit'>Add Log</button>
        </form>
        
    );
};

export default AddLogs;