import { useAtomValue } from "jotai";
import { batchAtom } from "@/atoms/all";

export const getStudentsByBatch = ({
  program,
  year,
}: {
  program: string;
  year: number;
}) => {
  const batches = useAtomValue(batchAtom);
  const [batch] = batches.filter(
    (b) => b.program === program && b.year === year
  );
  return batch.students;
};
