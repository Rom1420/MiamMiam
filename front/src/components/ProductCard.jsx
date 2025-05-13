export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={product.imageBase64} alt={product.name} style={{ width: "100%" }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Note : ⭐ {product.rating}</p>
      <button onClick={() => onEdit(product)}>✏️</button>
      <button onClick={() => onDelete(product.id)}>🗑️</button>
    </div>
  );
}
