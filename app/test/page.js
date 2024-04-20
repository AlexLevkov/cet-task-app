import React from "react";
import { supabase } from "@/utils/supabaseClient";

export const NewD = ({ test }) => {
  "use -client"; 
  return (
    <div>
      <pre>{JSON.stringify(test[0], null, 2)}</pre>
    </div>
  );
};

const fetchData = async () => {
  console.log("feteching ...");
  const { data, error } = await supabase.from("Tickets").select("*");
  console.log("data1:", data[0]);
  return data;
};

const page = async () => {
  console.log("Test");
  const test = await fetchData();
  console.log("test2:", test[0]);

  return (
    <div>
      Test Area
      {/* <pre>{JSON.stringify(test, null, 2)}</pre> */}
      <NewD test={test} />
    </div>
  );
};

export default page;
