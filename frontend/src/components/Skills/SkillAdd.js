import { useState, useContext } from "react";
import axios from "axios"; 
import { AuthContext } from "../../contexts/AuthContext"; 

const AddSkill = ({ onAddSkill }) => {
    const { user } = useContext(AuthContext); 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Other');
    const [level, setLevel] = useState('Beginner');
    const [availableFor, setAvailableFor] = useState('Teach');
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState(''); 
    const [loading, setLoading] = useState(false); // New loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to add a skill.');
            return;
        }

        const newSkill = {
            name,
            description,
            category,
            level,
            availableFor,
            addedBy: user._id,
        };

        try {
            setLoading(true); // Set loading state
            const response = await axios.post(`http://localhost:5000/skill/addSkill`, newSkill); 
            onAddSkill(response.data); 
            setSuccess('Skill added successfully!'); 
            // Clear form fields
            setName('');
            setDescription('');
            setCategory('Other');
            setLevel('Beginner');
            setAvailableFor('Teach');
            setError(''); // Clear error message on success
        } catch (error) {
            console.error('Error adding skill:', error);
            setError('Error adding skill. Please try again.'); 
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>} 
            {success && <div className="text-green-600">{success}</div>} 
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
                <button 
                    type="submit" 
                    className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Adding...' : 'Add Skill'}
                </button>
            </div>
        </form>
    );
};

export default AddSkill;
