// TICKETS ID

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  console.log("GET");
  const url = new URL(request.url);
  const index = url.pathname.split("/").pop(); // Gets the last segment of the path
  // console.log("index in tickets API:", index);
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("id", index);
  // console.log("data tickets in API:", data);
  // return new Response(data);
  return NextResponse.json(data);
}

export async function DELETE(request) {
  console.log("DELETE");
  const url = new URL(request.url);
  const index = url.pathname.split("/").pop(); // Gets the last segment of the path, assuming it's the ID
  // console.log("index to delete:", index);
  const { data, error } = await supabase
    .from("Tickets")
    .delete()
    .match({ id: index });
  console.log("deletion data:", data);
  console.log("error:", error);
  // Handle error if needed
  return NextResponse.json(data);
}

