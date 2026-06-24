import { useState } from "react";
import ProductList from "../user/ProductList";

function Home() {
  const [refresh] = useState(false);

  return (
    <div className="container mt-4">
      <ProductList refresh={refresh} />
    </div>
  );
}

export default Home;