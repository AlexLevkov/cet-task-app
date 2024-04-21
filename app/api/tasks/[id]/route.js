// TASKS ID

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    console.log("GET");
    const url = new URL(request.url);
    const index = url.pathname.split("/").pop(); // Gets the last segment of the path
    console.log("index:", index);
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("id", index);
    return NextResponse.json(data);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function DELETE(request) {
  try {
    console.log("DELETE IN TASKS");
    const url = new URL(request.url);
    const index = url.pathname.split("/").pop(); // Gets the last segment of the path, assuming it's the ID

    const ticketId = url.searchParams.get("ticketid") || null;

    let query = supabase.from("Tasks").delete();
    let criteria;

    if (ticketId) {
      criteria = { ticket_id: ticketId };
    } else {
      criteria = { id: index };
    }
    query = query.match(criteria);
    const { data, error } = await query;

    console.log("data:", data);
    console.log("error:", error);
    return NextResponse.json(data);
  } catch (error) {
    console.log("error:", error);
  }
}
