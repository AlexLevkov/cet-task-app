// TICKET TABLE

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET() {
  console.log("GET");
  request;
  return NextResponse.json("yes");
}

export async function POST(request) {
  // console.log("POST TICKET");
  const ticket = await request.json();
  // console.log("ticket print:", ticket);
  const res = await supabase.from("Tickets").insert([ticket]).select();
  // console.log("res:", res);
  const tickedId = res.data[0].id;
  revalidatePath("/");
  return NextResponse.json(tickedId);

  // const { data, error } = await supabase
  // .from("Tickets")
  // .insert([ticket], { returning: "minimal" })
  // .select();
}

export async function PUT(request) {
  console.log("PUT in API");
  const ticket = await request.json();
  const { data, error } = await supabase
    .from("Tickets")
    .update(ticket)
    .match({ id: ticket.id });
  console.log("data:", data);
  console.log("error:", error);
  return NextResponse.json("Success");
}
