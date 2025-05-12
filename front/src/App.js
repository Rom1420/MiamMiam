import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", title: "", image: "" });
  const [editId, setEditId] = useState(null);

  // Charger les produits depuis l'products au démarrage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
          throw new Error("Erreur de chargement des produits : " + response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };
    fetchProducts();
  }, []);


  // Sauvegarder un produit via l'products
  const saveProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:8080/products", {
        method: product.id ? "PUT" : "POST", // PUT pour mettre à jour, POST pour ajouter
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts((prev) =>
          product.id
            ? prev.map((p) => (p.id === data.id ? data : p)) // Mise à jour produit existant
            : [...prev, data] // Ajout du nouveau produit
        );
      } else {
        console.error("Erreur de sauvegarde :", data);
      }
    } catch (error) {
      console.error("Erreur de communication avec le serveur :", error);
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.title || !form.image) return;

    const productToSave = { ...form, id: editId || uuidv4() };

    saveProduct(productToSave); // Sauvegarder via l'products

    setForm({ name: "", title: "", image: "" });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const p = products.find((p) => p.id === id);
    setForm(p);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        console.error("Erreur de suppression");
      }
    } catch (error) {
      console.error("Erreur de communication avec le serveur :", error);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Produits goûtés 🍴</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
            <img src={p.image} alt="" style={{ width: "100%" }} />
            <h3>{p.name}</h3>
            <p>{p.title}</p>
            <button onClick={() => handleEdit(p.id)}>✏️</button>
            <button onClick={() => handleDelete(p.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
