import { connectToDatabase } from "@/db/connect";
import { NextRequest } from "next/server";

// Define the type for the handler
type Handler = (request: NextRequest) => Promise<Response>;

export function dbMiddleware(handler: Handler): Handler {
  return async (request: NextRequest): Promise<Response> => {
    try {
      // Connect to the database
      await connectToDatabase();

      // Proceed with the original handler
      return await handler(request);
    } catch (error) {
      console.error("Database Middleware Error:", error);

      // Return an error response in case of failure
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
}
