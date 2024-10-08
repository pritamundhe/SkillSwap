import React from 'react'
import { useState } from 'react';

function SkillEdit(props) {
    
    const [skillName, setSkillName] = useState(props.Skill);
    const [university, setUniversity] = useState(props.university);
    const [isAdded, setIsAdded] = useState(false); // Track if skill is added

    const handleSubmit = (e) => {
        e.preventDefault();

        if (skillName && university) {
            // Simulate adding the skill (you could make an API call here)
            console.log({ skillName, university });

            // Clear the form inputs
            setSkillName('');
            setUniversity('');

            // Set the "skill added" status
            setIsAdded(true);
        }
    };

    

    return (
        <div>
            {isAdded ? (
                // Show success message when a skill is added
                <div className="text-center">
                    <span class="material-symbols-outlined text-purple-700 text-7xl">
                        task_alt
                    </span>
                    <h3 className="text-lg font-semibold text-black">Your skill has been edited</h3>
                    
                </div>
            ) : (
                // Show the form when no skill has been added yet
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Add a New Skill</h2>
                        <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
                            Skill Name
                        </label>
                        <input
                            type="text"
                            id="skillName"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                            University
                        </label>
                        <input
                            type="text"
                            id="university"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-sm shadow-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700"
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
  )
}

export default SkillEdit;
