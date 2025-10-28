export default function SearchInput({ placeholder }) {
  return (
    <div className="search">
      <span className="search-icon">🔍</span>
      <input placeholder={placeholder} />
    </div>
  );
}
