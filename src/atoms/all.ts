import { atom } from "jotai";

type Student = {
  studentId: string;
  name: string;
  email: string;
};

type Batch = {
  id: number;
  program: string;
  year: number;
  semester: string;
  students: Student[];
};

// Initial batch data
const initialBatch: Batch[] = [
  {
    id: 1,
    program: "BTech",
    year: 2021,
    semester: "Spring",
    students: [
      { studentId: "1", name: "Alice", email: "LCB2021016@iiitl.ac.in" },
    ],
  },
  { id: 2, program: "BTech", year: 2022, semester: "Fall", students: [] },
  { id: 3, program: "BTech", year: 2023, semester: "Spring", students: [] },
  { id: 4, program: "MTech", year: 2021, semester: "Spring", students: [] },
  { id: 5, program: "MTech", year: 2022, semester: "Fall", students: [] },
  { id: 6, program: "MTech", year: 2023, semester: "Spring", students: [] },
  { id: 7, program: "MBA", year: 2021, semester: "Spring", students: [] },
  { id: 8, program: "MBA", year: 2022, semester: "Fall", students: [] },
  { id: 9, program: "MBA", year: 2023, semester: "Spring", students: [] },
  { id: 10, program: "MSc", year: 2021, semester: "Spring", students: [] },
  { id: 11, program: "MSc", year: 2022, semester: "Fall", students: [] },
  { id: 12, program: "MSc", year: 2023, semester: "Spring", students: [] },
];

// Read-only atom for initial batch data
export const batchAtom = atom(initialBatch);

// Writable atom to handle updates
export const updateBatchAtom = atom(
  (get) => get(batchAtom),
  (get, set, { batchId, student }: { batchId: number; student: Student }) => {
    const batches = get(batchAtom);
    const updatedBatches = batches.map((batch) =>
      batch.id === batchId
        ? {
            ...batch,
            students: [...batch.students, student], // Add the new student to the specific batch
          }
        : batch
    );
    set(batchAtom, updatedBatches);
  }
);
