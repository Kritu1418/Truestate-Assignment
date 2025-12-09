export default function SearchBar({search, setSearch}){
  return (
    <input
      placeholder="Name, Phone no."
      value={search}
      onChange={e=>setSearch(e.target.value)}
      style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #e6e9ec'}}
    />
  );
}
