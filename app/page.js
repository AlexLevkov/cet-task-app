import { supabase } from "@/utils/supabaseClient";
import TicketList from "./components/TicketList";
import PostTicket from "./components/PostTicket";
import TicketModal from "./components/TicketModal";
import List from "./components/List";
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
    id,
    tasks:Tasks!inner(title, description, owner, status,id)
  `);

  console.log("data1:", data);

  return (
    <div>
      <h2>Task App</h2>
      {/* <TicketModal /> */}
      {/* <PostTicket /> */}
      {/* <br /> */}
      {/* <br /> */}
      {data.map((t, index) => {
        return <List key={t.id} ticketData={t} />;
      })}
      {/* <List />
      {data &&
        data.map((t) => {
          <List ticket={t} />;
        })} */}
    </div>
  );
}
