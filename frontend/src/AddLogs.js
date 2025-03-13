import { useState } from 'react';

const AddLogs = ({ onLogAdded }) => {
    const [form, setForm] = useState({
        place_name: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } else {
            setFileName("No file chosen");
        }
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
            setFileName("No file chosen");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Matching Gradient Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <h2 className="text-3xl font-bold text-white text-center">Add a Place!</h2>
            </div>
            <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Place Name Input */}
                <div>
                    <label htmlFor="place_name" className="block text-lg font-medium text-gray-700 mb-2">
                        Place Name
                    </label>
                    <input
                        id="place_name"
                        name="place_name"
                        type="text"
                        placeholder="Enter location name"
                        value={form.place_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                </div>

                {/* Description Textarea */}
                <div>
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Tell us about this place"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200 ease-in-out">
                            Select Image
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                        <span className="text-gray-600">{fileName}</span>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg 
                                hover:from-blue-700 hover:to-purple-700 transition-all duration-200 
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                    Add Log
                </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddLogs;