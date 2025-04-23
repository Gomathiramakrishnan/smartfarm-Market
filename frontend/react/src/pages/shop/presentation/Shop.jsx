import React, { useEffect, useState } from "react";
import { getItems } from "../application/shop"; // ✅ corrected path

function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await getItems();
      setItems(res);
    }
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {items.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}

export default Shop;
