import { atom } from "jotai";

export type Student = {
  id: number;
  name: string;
  email: string;
};

export type Batch = {
  id: number;
  program: string;
  year: number;
  semester: string;
  students: Student[];
};

export const initialStudent: Student[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice", email: "alice@example.com" },
  { id: 4, name: "Bob", email: "bob@example.com" },
  { id: 5, name: "Charlie", email: "charlie@example.com" },
];

// Initial batch data
export const initialBatch: Batch[] = [
  { id: 1, program: "BTech", year: 2021, semester: "Spring", students: initialStudent },
  { id: 2, program: "BTech", year: 2022, semester: "Fall", students: initialStudent },
  { id: 3, program: "BTech", year: 2023, semester: "Spring", students: initialStudent },
  { id: 4, program: "MTech", year: 2021, semester: "Spring", students: initialStudent },
  { id: 5, program: "MTech", year: 2022, semester: "Fall", students: initialStudent },
  { id: 6, program: "MTech", year: 2023, semester: "Spring", students: initialStudent },
  { id: 7, program: "MBA", year: 2021, semester: "Spring", students: initialStudent },
  { id: 8, program: "MBA", year: 2022, semester: "Fall", students: initialStudent },
  { id: 9, program: "MBA", year: 2023, semester: "Spring", students: initialStudent },
  { id: 10, program: "MSc", year: 2021, semester: "Spring", students: initialStudent },
  { id: 11, program: "MSc", year: 2022, semester: "Fall", students: initialStudent },
  { id: 12, program: "MSc", year: 2023, semester: "Spring", students: initialStudent },
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


