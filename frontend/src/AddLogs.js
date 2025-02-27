import { useState } from 'react';

const AddLogs = ({ onLogAdded }) => {
    const [form, setForm] = useState({
        place_name: "",
        description: "",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send both text data and the image file
        const formData = new FormData();
        formData.append('place_name', form.place_name);
        formData.append('description', form.description);
        if (image) {
            formData.append('image', image); // Append the image file if it exists
        }

        // Send the request to the backend
        const response = await fetch("http://localhost:5000/logs", {
            method: "POST",
            body: formData, // Use FormData instead of JSON
        });

        if (response.ok) {
            const newLog = await response.json();
            onLogAdded(newLog); // Notify the parent component about the new log
            setForm({ place_name: "", description: "" }); // Reset the form
            setImage(null); // Reset the image
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name='place_name' placeholder='Place Name' value={form.place_name} onChange={handleChange} required/>
            <input name='description' placeholder='Description' value={form.description} onChange={handleChange} required/>
            <input type='file' name='image' onChange={handleImageChange} accept='image/*' />
            <button type='submit'>Add Log</button>
        </form>
        
    );
};

export default AddLogs;