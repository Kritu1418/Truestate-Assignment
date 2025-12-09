export default function Pagination({page, setPage, totalPages}){
  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <button className="page-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>Previous</button>
      <div style={{textAlign:'center'}}>Page {page} / {totalPages}</div>
      <button className="page-btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}>Next</button>
    </div>
  );
}
