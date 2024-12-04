import { useState, useEffect } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { useSetAtom, useAtom } from "jotai";
import { batchAtom } from "@/atoms/all";
import { getStudentsFromCSV } from "@/utils/parseStudents";

const AddBatchButton: React.FC = () => {
  const [batches, setBatches] = useAtom(batchAtom); // Get current batches from batchAtom
  const setBatchesState = useSetAtom(batchAtom); // Function to update the atom
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    program: "",
    year: "",
    semester: "",
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCsvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.program || !formData.year || !formData.semester || !csvFile) {
      alert("Please fill in all fields.");
      return;
    }
    e.preventDefault();

    // Parse students from the CSV file
    const parsedStudents = await getStudentsFromCSV(csvFile);
    const students = parsedStudents.map((student, index) => ({
      ...student,
      id: index + 1, // Assign a unique ID to each student
    }));

    // Create the new batch object
    const newBatch = {
      id:
        batches.length > 0
          ? Math.max(...batches.map((batch) => batch.id)) + 1
          : 1, // Generate a unique ID
      program: formData.program,
      year: parseInt(formData.year),
      semester: formData.semester,
      students: students, // Add the parsed students to the batch
    };

    // Update the batchAtom with the new batch
    setBatchesState((prevBatches) => [...prevBatches, newBatch]);

    // Reset the form and close the dialog
    setIsOpen(false);
    setFormData({ program: "", year: "", semester: "" });
    setCsvFile(null);
  };

  // Dynamic semester options based on program
  const getSemesterOptions = () => {
    if (formData.program === "BTech") {
      return Array.from({ length: 8 }, (_, i) => i + 1);
    }
    if (["MTech", "MSc"].includes(formData.program)) {
      return Array.from({ length: 6 }, (_, i) => i + 1);
    }
    return [];
  };

  // Ensure re-render when program changes
  useEffect(() => {
    // Reset the semester to an empty value when program changes
    setFormData((prevState) => ({
      ...prevState,
      semester: "",
    }));
  }, [formData.program]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 cursor-pointer flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Add New Batch
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed top-1/2 w-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <DialogTitle className="text-black text-bold text-2xl mb-3">
            Add New Batch
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label>Program</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Program</option>
                <option value="BTech">BTech</option>
                <option value="MTech">MTech</option>
                <option value="MBA">MBA</option>
                <option value="MSc">MSc</option>
              </select>
            </div>
            <div>
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label>Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Semester</option>
                {getSemesterOptions().map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Upload Student Data (CSV)</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Batch
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddBatchButton;
