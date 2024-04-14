// TASKS TABLE

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  console.log("POST TASK");
  const task = await request.json();
  const res = await supabase.from("Tasks").insert([task]);
  console.log("res:", res);
  return NextResponse.json("Success");

}

export async function PUT(request) {

  const task = await request.json();
  const { data, error } = await supabase
    .from("Tasks")
    .update(task)
    .match({ id: task.id });

  return NextResponse.json("Success");
}



