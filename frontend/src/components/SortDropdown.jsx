export default function SortDropdown({ sort, setSort }) {
  return (
    <select
      className="sort-dropdown"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="date_desc">Date (Newest First)</option>
      <option value="date_asc">Date (Oldest First)</option>
      <option value="name_asc">Customer (A-Z)</option>
      <option value="name_desc">Customer (Z-A)</option>
    </select>
  );
}
