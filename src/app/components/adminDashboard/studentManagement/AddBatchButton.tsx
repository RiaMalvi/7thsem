import { useState, useEffect } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { getStudentsFromCSV } from "@/utils/parseStudents";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { instance } from "@/config/axios";
import { AxiosError } from "axios";

interface FormData {
  file: FileList;
  program: "BTECH" | "MTECH" | "MBA";
}

const AddBatchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { file, program } = data;
    const students = await getStudentsFromCSV(file[0]);
    console.log({ students, program });
    if (!students) {
      toast.error("Invalid CSV file");
      return;
    }
    try {
      const response = await instance.post("/api/batch", {
        students,
        program,
      });
      console.log(response.data);
      toast.success("Batch created successfully");
    } catch (error: any) {
      const err = error as AxiosError & {
        response: { data: { error: string } };
      };
      console.error(err || "Internal Server Error");
      toast.error(err.response?.data.error || "Internal Server Error");
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block font-medium text-gray-700 mb-1"
              >
                Upload CSV File
              </label>
              <input
                type="file"
                id="file"
                {...register("file", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.file && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="program"
                className="block font-medium text-gray-700 mb-1"
              >
                Program
              </label>
              <select
                id="program"
                {...register("program", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="BTECH">BTECH</option>
                <option value="MTECH">MTECH</option>
                <option value="MBA">MBA</option>
              </select>
              {errors.program && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
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
