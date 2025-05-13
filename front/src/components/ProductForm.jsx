import { useState, useEffect } from "react";

export default function ProductForm({ onSave, editProduct }) {
  const [form, setForm] = useState({ name: "", description: "", imageBase64: "", rating: "" });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.imageBase64 || !form.rating) return;
    onSave(form);
    setForm({ name: "", description: "", imageBase64: "", rating: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="file"
        onChange={handleImageChange}
      />
      <input
        type="number"
        placeholder="Note"
        min="0"
        max="5"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
      />
      <button type="submit">{editProduct ? "Modifier" : "Ajouter"}</button>
    </form>
  );
}
