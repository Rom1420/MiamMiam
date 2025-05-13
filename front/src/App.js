import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  const saveProduct = async (product) => {
    const method = product.id ? "PUT" : "POST";
    const url = "http://localhost:8080/products";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product.id ? product : { ...product, id: uuidv4() }),
    });

    const data = await response.json();
    if (response.ok) {
      setProducts((prev) =>
        product.id
          ? prev.map((p) => (p.id === data.id ? data : p))
          : [...prev, data]
      );
      setEditProduct(null);
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Miam Miam</h1>
      <ProductForm onSave={saveProduct} editProduct={editProduct} />
      <ProductList products={products} onEdit={setEditProduct} onDelete={deleteProduct} />
    </div>
  );
}

export default App;
