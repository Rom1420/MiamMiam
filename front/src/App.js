// App.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", title: "", image: "" });
  const [editId, setEditId] = useState(null);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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

    if (editId) {
      setProducts(products.map(p => p.id === editId ? { ...p, ...form } : p));
      setEditId(null);
    } else {
      setProducts([...products, { ...form, id: uuidv4() }]);
    }

    setForm({ name: "", title: "", image: "" });
  };

  const handleEdit = (id) => {
    const p = products.find(p => p.id === id);
    setForm(p);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Produits goûtés 🍴</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
        {products.map(p => (
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
