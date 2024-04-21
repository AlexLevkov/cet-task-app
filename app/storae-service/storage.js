export const getItems = async (db, filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const data = await fetch("/api/" + db + "?" + params, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error in storage:", error);
  }
};

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
  } catch (error) {
    console.log("error:", error);
  }
};

export const deleteItem = async (index, db, fIndex) => {
  const params = new URLSearchParams(fIndex).toString();
  try {
    const data = await fetch("/api/" + db + "/" + index + "?" + params, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error in storage:", error);
  }
};
