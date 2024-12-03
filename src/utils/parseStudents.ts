import { parse } from "csv-parse/browser/esm";
import { Student } from "../types/student";

export const getStudentsFromCSV = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const students: Student[] = [];
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result as string;
      const parser = parse({ columns: true });

      parser.on("readable", () => {
        let record;
        while ((record = parser.read())) {
          students.push(record);
        }
      });

      parser.on("error", (err) => {
        reject(err);
      });

      parser.on("end", () => {
        resolve(students);
      });

      parser.write(csvData);
      parser.end();
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file"));
    };

    reader.readAsText(file);
  });
};
