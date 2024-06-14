import React from 'react';
import Header from '../components/Header';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import Footer from '../components/Footer';

function page() {
      return (
        <div>
            <Header />
            <StudentList />
            <StudentForm />
            <Footer />
        </div>
    )
}

export default page
