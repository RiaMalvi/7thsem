"use client";

import AdminSidebar from "@/app/components/adminDashboard/sidebar";
import { useAtomValue } from "jotai";
import { batchAtom } from "@/atoms/all";
import { useState } from "react";
import AddBatchButton from "@/app/components/adminDashboard/studentManagement/AddBatchButton";

interface Batch {
  id: number;
  program: string;
  year: number;
  semester: string;
}

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

  const toggleSection = (program: string) => {
    setExpanded((prev) => ({ ...prev, [program]: !prev[program] }));
  };

  console.log(groupedBatches);

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
                    className="bg-white shadow-md rounded-lg p-4 mb-4"
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
      </div>
    </div>
  );
};

export default UserManagement;
