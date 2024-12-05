"use client";

import AdminSidebar from "@/app/components/adminDashboard/sidebar";
import { useState, useEffect } from "react";
import AddBatchButton from "@/app/components/adminDashboard/studentManagement/AddBatchButton";
import { instance } from "@/config/axios";
import { useRouter } from "next/navigation";

// Define the structure of a batch
interface Batch {
  id: string;
  program: string;
  year: number;
  semester: {
    semester: number;
  };
  students: { id: string; name: string; email: string }[];
}

const UserManagement: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const router = useRouter();

  const toggleSection = (program: string) => {
    setExpanded((prev) => ({ ...prev, [program]: !prev[program] }));
  };

  useEffect(() => {
    instance.get<Batch[]>("/api/batch").then((res) => {
      setBatches(res.data);
      setLoading(false);
    });
  }, []);

  const groupedBatches = batches.reduce<Record<string, Batch[]>>(
    (acc, batch) => {
      if (!acc[batch.program]) {
        acc[batch.program] = [];
      }
      acc[batch.program].push(batch);
      return acc;
    },
    {}
  );

  const viewStudentDetails = (studentId: string) => {
    // Replace with the appropriate path to your student details page
    router.push(`/student/${studentId}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <AdminSidebar />
      <div className="flex-1 p-6 text-black">
        <AddBatchButton />
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          Object.entries(groupedBatches).map(([program, batches]) => (
            <div key={program} className="mb-8 border rounded-lg shadow-lg">
              <div
                className="flex justify-between items-center bg-gray-200 p-4 cursor-pointer"
                onClick={() => toggleSection(program)}
              >
                <h1 className="text-xl font-bold">{program}</h1>
                <span className="text-lg">{expanded[program] ? "▼" : "▶"}</span>
              </div>
              {expanded[program] && (
                <div className="p-4">
                  {batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
                      onClick={() => setSelectedBatch(batch)}
                    >
                      <h2 className="text-lg font-bold">Year {batch.year}</h2>
                      <p className="text-sm text-gray-600">
                        Semester {batch.semester.semester}
                      </p>
                      <p className="text-sm text-gray-600">
                        {batch.students.length} students
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
        {selectedBatch ? (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Students in Batch: {selectedBatch.program} - Year{" "}
              {selectedBatch.year} - {selectedBatch.semester.semester}
            </h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Student Id</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email Id</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch.students.map((student) => (
                  <tr
                    key={student.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => viewStudentDetails(student.id)}
                  >
                    <td className="px-4 py-2 border">{student.id}</td>
                    <td className="px-4 py-2 border">{student.name}</td>
                    <td className="px-4 py-2 border">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-600">
            Please select a batch to view students.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
