// TICKET TABLE

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    console.log("GET");
    const url = new URL(request.url);
    // console.log("url:", url);
    const startDate = url.searchParams.get("startDate") || "2021-04-04"; // Default value if not provided
    const endDate = url.searchParams.get("endDate") || "2025-04-04";

    const res = await supabase
      .from("Tickets")
      .select(
        "title, description, owner, due_date, status, priority, id, tasks:Tasks!inner(title, description, owner, status, id)"
      )
      .order("id", { ascending: false })
      .gte("due_date", startDate)
      .lte("due_date", endDate);

    return NextResponse.json(res);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function POST(request) {
  try {
    const ticket = await request.json();
    const res = await supabase.from("Tickets").insert([ticket]).select();
    const tickedId = res.data[0].id;
    revalidatePath("/");
    return NextResponse.json(tickedId);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function PUT(request) {
  try {
    const ticket = await request.json();
    const { data, error } = await supabase
      .from("Tickets")
      .update(ticket)
      .match({ id: ticket.id });

    return NextResponse.json("Success");
  } catch (error) {
    console.log("error:", error);
  }
}
