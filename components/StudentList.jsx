'use client'
import React, { useEffect, useState } from 'react';

const StudentList = () => {
    const [students, setStudents] = useState([]);  // State to store student data

    useEffect(() => {
        // Function to fetch student data
        async function fetchStudents() {
            try {
                const response = await fetch('http://localhost:5000/students', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  // Convert response payload to JSON
                setStudents(data);  // Update state with the fetched students
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        }

        fetchStudents();  // Call the fetch function when the component mounts
    }, []);  // Empty dependency array means this effect runs once after the initial render

    
    // Render the students in a list
    return (
<div class="flex justify-center items-center ">
    <table class=" w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 justify-center">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    First Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Date of Birth
                </th>
                <th scope="col" class="px-6 py-3">
                    Current Grade
                </th>
            </tr>
        </thead>
        <tbody>
        {students.map(student => (
                <tr key={student.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                    <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {student.fname}
                    </td>
                    <td className="px-6 py-1">
                        {student.lname}
                    </td>
                    <td className="px-6 py-1">
                        {student.dob}
                    </td>
                    <td className="px-6 py-1">
                        {student.grade}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    );
};

export default StudentList;
