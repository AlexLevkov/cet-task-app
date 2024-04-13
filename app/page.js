import { supabase } from "@/utils/supabaseClient";
import TicketList from "./components/TicketList";
import PostTicket from "./components/PostTicket";
import TicketModal from "./components/TicketModal";
// const { data, error } = await supabase.from("Tickets").select("*");
export const dynamic = "force-dynamic";

export default async function Home() {
  // const { data, error } = await supabase.from("Tasks").select();
  const { data, error } = await supabase.from("Tickets") //.select();
    .select(`
    title,
    description,
    owner,
    due_date,
    status,
    priority,
    tasks:Tasks!inner(title, description, owner, status)
  `);

  // console.log("data1:", data);

  return (
    <div>
      <h2>Task App</h2>
      {/* <TicketModal /> */}
      {/* <PostTicket /> */}
      {/* <br /> */}
      {/* <br /> */}
      <TicketList data={data} />
    </div>
  );
}
