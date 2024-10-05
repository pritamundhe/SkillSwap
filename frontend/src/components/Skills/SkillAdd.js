import { useState } from "react";
import axios from "axios"; // Make sure you have axios installed

const AddSkill = ({ onAddSkill ,userId}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Other');
    const [level, setLevel] = useState('Beginner');
    const [availableFor, setAvailableFor] = useState('Teach');

    console.log('Adding skill for userId:', userId); // Debug log to ensure userId is passed

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newSkill = {
            name,
            description,
            category,
            level,
            availableFor,
        };
    
        try {
            const response = await axios.post(`http://localhost:5000/skill/addSkill/${userId}`, newSkill, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is present
                },
            });
            onAddSkill(response.data); // Pass the new skill to the parent
        } catch (error) {
            console.error('Error adding skill:', error.response ? error.response.data : error.message);
        }
        
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="Technical">Technical</option>
                    <option value="Creative">Creative</option>
                    <option value="Business">Business</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Available For</label>
                <select
                    value={availableFor}
                    onChange={(e) => setAvailableFor(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="Teach">Teach</option>
                    <option value="Learn">Learn</option>
                </select>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                    Add Skill
                </button>
            </div>
        </form>
    );
};

export default AddSkill;
