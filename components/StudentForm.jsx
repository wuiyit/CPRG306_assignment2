//rafce

'use client'
import React,{useState} from 'react'
// State is the local storage of the component

const StudentForm = () => {
        // State for each input field. Initialize with empty strings and showing at at the client side
        const [formData, setFormData] = useState({
            fname: '',
            lname: '',
            dob: '',
            grade: '',
        });
                
        // State for error messages
        
        const [message, setMessage] = useState('');
            
            // Handle input changes, e = event (any event that happens in the form)
        //everthing entered in the form is stored in the event
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };
    
    
        // Handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();
    
    let isValid = true;

    if (new Date(formData.dob) > new Date('2019-12-31')) {
        setMessage('Date of birth must be before 2019/12/31.');
        return; // Stop the submission if validation fails
        isValid = false;
    }

    // Submit form if valid
    if (isValid) {
        try {
            const response = await fetch('http://localhost:5000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json();
                setMessage('User created successfully');
                //empty the form
                setFormData({
                    fname: '',
                    lname: '',
                    dob: '',
                    grade: ''
                });
            } else {
                const errorText = await response.text();
        console.error('Failed to register:', errorText);
        setMessage('Failed to register. Please try again.');
            }
        }
        catch (err) {
            console.error('Error:', err);
    setMessage('Server error. Please try again later.');
        }
    }
};

          return (
    <div className='max-w-md mx-auto mt-10 bg-pink-300 p-6 rounded-lg shadow-md mb-10'>
        <h2 className='text-2xl mb-4 text-center'>Registration Form</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4 mt-2'>
                <label htmlFor='fname' className='block text-sm font-medium text-gray-700'>First Name</label>
                <input type='text' 
                id='fname' 
                name='fname' 
                className='mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value = {formData.fname}
                onChange = {handleChange}
                required/>
            </div>
            <div className='mb-4 mt-2'>
                <label htmlFor='lname' className='block text-sm font-medium text-gray-700'>Last Name</label>
                <input type='text' 
                id='lname' 
                name='lname' 
                className='mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value = {formData.lname}
                onChange = {handleChange}
                required/>
            </div>
            <div className='mb-4 mt-2'>
                <label htmlFor='dob' className='block text-sm font-medium text-gray-700' >Date of Birth</label>
                 <input type='date' 
                id='dob' 
                name='dob' 
                placeholder = '2021-01-28'
                className='mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value = {formData.dob}
                onChange = {handleChange}
                required/>
            </div>
            <div className='mb-4 mt-2'>
                <label htmlFor='grade' className='block text-sm font-medium text-gray-700' >Current Grade</label>
                <select 
                id='grade' 
                name='grade' 
                placeholder = 'K-12'
                className='mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value = {formData.grade}
                onChange = {handleChange}
                required>
                <option value="">Select a grade</option>
                <option value="K">K</option>
                {[...Array(13).keys()].slice(1).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>))}
                </select>

            </div>
            <div className='mb-4 mt-2'>
                <button type='submit' className='mt-4 w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Register</button>
            </div>
        </form>
                {message && <div className='mt-4 text-green-700 px-4 py-3 rounded relative'>{message}
            </div>}
        </div>
  )
};  

export default StudentForm