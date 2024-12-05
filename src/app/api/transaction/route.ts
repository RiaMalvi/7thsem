import { Transaction } from "@/db/schema/transaction";
import { NextRequest, NextResponse } from "next/server";
import { dbMiddleware } from "@/middleware/db";

async function getTransactions(request: NextRequest): Promise<NextResponse> {
  try {
    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error getting transactions", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function createTransaction(request: NextRequest): Promise<NextResponse> {
  try {
    const transaction1 = new Transaction({
      transactionId: "TXN001",
      student: "6750fd4ffc3c5e800c55b5e5",
      semester: "6750b6073021221f83beecef",
      amount: 100000,
      date: new Date(),
      status: "COMPLETED",
    });
    const transaction2 = new Transaction({
      transactionId: "TXN002",
      student: "6750fd4ffc3c5e800c55b5e5",
      semester: "6750b6073021221f83beecef",
      amount: 15000,
      date: new Date(),
      status: "COMPLETED",
    });
    await transaction1.save();
    await transaction2.save();
    return NextResponse.json({ message: "Transaction created" });
  } catch (error) {
    console.error("Error creating transaction", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = dbMiddleware(getTransactions);
export const POST = dbMiddleware(createTransaction);
