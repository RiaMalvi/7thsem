export type FeeData = {
  student: {
    name: string;
    rollNumber: string;
    email: string;
  };
  semester: string;
  fees: Array<{
    description: string;
    transactionId: string;
    date: string;
    amount: number;
  }>;
};
