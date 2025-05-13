import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
