// "use client";
import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";
import SubmitTicket from "./SubmitTicket";
const PostTicket = () => {
  const test = 123;

  console.log(
    "PostTicket------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  const addPost = async (formData) => {
    "use server";
    // console.log("formData:", formData);

    const ticket = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    // console.log("ticket:", ticket);
    try {
      // const { data, error } = await supabase.from("Tickets").insert([ticket]);
      const { data, error } = await supabase
        .from("Tickets")
        .insert([ticket], { returning: "minimal" })
        .select();
      console.log("data:", data);
      console.log("error:", error);
      revalidatePath("/");
    } catch (err) {
      console.log("err:", err);
    }
  };

  const addTask = async () => {
    "use server";

    console.log("addTask");
    const task = { title: "tasks for 5", ticket_id: 7 };
    console.log("task:", task);
    const { data, error } = await supabase.from("Tasks").insert([task]);
    console.log("data:", data);
    console.log("error:", error);
    revalidatePath("/");
  };

  return (
    <div>
      <SubmitTicket addPost={addPost} />
      <form action={addPost}>
        <label>
          title
          <input type="text" name="title" />
        </label>
        <label>
          description
          <input type="text" name="description" />
        </label>
        <button type="submit">submit ticket</button>
      </form>
      <br />
      <form action={addTask}>
        <label>
          title
          <input type="text" name="title" />
        </label>
        <label>
          description
          <input type="text" name="description" />
        </label>
        <button type="submit">submit task</button>
      </form>
    </div>
  );
};

export default PostTicket;
