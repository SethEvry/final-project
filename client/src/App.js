import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";

//components
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import Header from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import DeleteCourse from "./components/DeleteCourse";

//context
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />}>
          <Route
            path="delete"
            element={
              <ProtectedRoute>
                <DeleteCourse />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="courses/:id/update"
          element={
            <ProtectedRoute>
              <UpdateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses/create"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
