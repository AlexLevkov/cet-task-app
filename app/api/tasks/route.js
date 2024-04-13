import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET() {
  console.log("GET");
  request;
  return NextResponse.json("yes");
}

export async function POST(request) {
  console.log("POST TASK");
  const task = await request.json();
  console.log("task:", task);
  // console.log("tasks:", tasks);
  // console.log("tasks:", tasks);
  // console.log("ticket print:", ticket);
  const res = await supabase.from("Tasks").insert([task]);
  console.log("res:", res);
  return NextResponse.json("Success");
  // const tickedId = res.data[0].id;
  // revalidatePath("/");
  // return NextResponse.json(tickedId);

  // const { data, error } = await supabase
  // .from("Tickets")
  // .insert([ticket], { returning: "minimal" })
  // .select();
}

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     console.log("GET");
//     // Extract ticket data from request body
//     // const ticketData = req.body;

//     // Insert ticket data into the database (pseudo-code)
//     const { data, error } = await insertTicketIntoDatabase(ticketData);

//     // Handle response
//     if (error) {
//       return res.status(500).json({ error });
//     }
//     return res.status(200).json(data);
//   }
//   // Handle other HTTP methods if necessary
// }
