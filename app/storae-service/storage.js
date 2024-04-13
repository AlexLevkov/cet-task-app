export const updateItem = async (item, db) => {
  console.log("updateItem");
  console.log("item:", item);
  console.log("db:", db);
  const res = await fetch("/api/" + db, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};
