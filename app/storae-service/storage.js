export const getItem = async (index, db) => {
  try {
    const data = await fetch("/api/" + db + "/" + index, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error in storage:", error);
  }
};

export const updateItem = async (item, db) => {
  try {
    const res = await fetch("/api/" + db, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    // console.log("res updateItem:", res);
  } catch (error) {
    console.log("error:", error);
  }
};

export const deleteItem = async (index, db) => {
  console.log("index in storage:", index);
  try {
    const data = await fetch("/api/" + db + "/" + index, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error in storage:", error);
  }
};
