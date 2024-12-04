"use client";

import AdminSidebar from "@/app/components/adminDashboard/sidebar";
import { useAtomValue } from "jotai";
import { batchAtom, Batch} from "@/atoms/all";
import { useState } from "react";
import AddBatchButton from "@/app/components/adminDashboard/studentManagement/AddBatchButton";

const UserManagement: React.FC = () => {
  const batches = useAtomValue<Batch[]>(batchAtom);

  const groupedBatches: Record<string, Batch[]> = batches.reduce(
    (acc, batch) => {
      if (!acc[batch.program]) {
        acc[batch.program] = [];
      }
      acc[batch.program].push(batch);
      return acc;
    },
    {} as Record<string, Batch[]>
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.keys(groupedBatches).reduce((acc, program) => {
      acc[program] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const toggleSection = (program: string) => {
    setExpanded((prev) => ({ ...prev, [program]: !prev[program] }));
  };

  const handleBatchClick = (batch: Batch) => {
    setSelectedBatch(batch); // Set the selected batch when clicked
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <AdminSidebar />
      <div className="flex-1 p-6 text-black">
        <AddBatchButton />
        {Object.entries(groupedBatches).map(([program, programBatches]) => (
          <div key={program} className="mb-8 border rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center bg-gray-200 p-4 cursor-pointer"
              onClick={() => toggleSection(program)}
            >
              <h1 className="text-xl font-bold">{program}</h1>
              <span className="text-lg">{expanded[program] ? "▼" : "▶"}</span>
            </div>
            {expanded[program] && (
              <div className="p-4 max-h-80 overflow-y-auto">
                {programBatches.map((batch) => (
                  <div
                    key={`${batch.program}-${batch.year}-${batch.id}`}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
                    onClick={() => handleBatchClick(batch)} // Set the selected batch
                  >
                    <h2 className="font-semibold text-lg">
                      Year: {batch.year}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Semester: {batch.semester}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Display students table only if a batch is selected */}
        {selectedBatch ? (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Students in Batch: {selectedBatch.program} - Year{" "}
              {selectedBatch.year} - {selectedBatch.semester}
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Student Id</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email Id</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch.students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2 border">{student.id}</td>
                    <td className="px-4 py-2 border">{student.name}</td>
                    <td className="px-4 py-2 border">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Fallback message if no batch is selected yet
          <div className="mt-6 text-center text-gray-600">
            Please select a batch to view students.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
