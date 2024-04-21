// TICKETS ID

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    console.log("GET");
    const url = new URL(request.url);
    const index = url.pathname.split("/").pop();
    const { data, error } = await supabase
      .from("Tickets")
      .select("*")
      .eq("id", index);
    return NextResponse.json(data);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function DELETE(request) {
  try {
    console.log("DELETE");
    const url = new URL(request.url);
    const index = url.pathname.split("/").pop();
    const { data, error } = await supabase
      .from("Tickets")
      .delete()
      .match({ id: index });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error:", error);
  }
}
