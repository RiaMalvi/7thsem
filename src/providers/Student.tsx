"use client";

import React, { createContext, useContext, useEffect } from "react";
import { instance } from "@/config/axios";

// Define the structure of a user
interface Student {
  _id: string;
  studentId: string;
  name: string;
  email: string;
}

// Define the structure of the context
interface StudentContextType {
  student: Student | null;
  loading: boolean;
  setStudent: (student: Student) => void;
}

// Create the context
const StudentContext = createContext<StudentContextType>({
  student: null,
  loading: true,
  setStudent: () => {},
});

// useStudent hook to consume the context
export const useStudent = () => useContext(StudentContext);

interface StudentProviderProps {
  children: React.ReactNode;
}

// Create the context provider with type checking
export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}: StudentProviderProps) => {
  const [student, setStudent] = React.useState<Student | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    instance
      .post("/api/auth/student/me", { token })
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting student", error);
        setLoading(false);
      });
  }, []);

  return (
    <StudentContext.Provider value={{ student, loading, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
