import { useState, useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import CourseDetail from './components/CourseDetail';

//components
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />    
        <Route path="courses/:id" element = {<CourseDetail />} />
        <Route path="courses/:id/update" element={<UpdateCourse />} />
        <Route path="courses/create" element= {<CreateCourse />} />
        <Route path="signin" element={<UserSignIn />}/>
        <Route path="signup" element={<UserSignUp />}/>
        <Route path="signout" element={<UserSignOut />}/>
      </Routes>
    </>
  );
}

export default App;
