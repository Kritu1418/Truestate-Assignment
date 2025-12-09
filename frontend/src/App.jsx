import React from "react";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SalesTable from "./components/SalesTable";
import Pagination from "./components/Pagination";
import "./styles.css";
import useSales from "./hooks/useSales";

export default function App(){
  const {
    search,
    setSearch,
    filters,
    setFilters,
    sort,
    setSort,
    page,
    setPage,
    data,
    loading,
  } = useSales();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Invoices</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <h1>Sales Management System</h1>
          <div className="search-input"><SearchBar search={search} setSearch={setSearch} /></div>
        </div>

        <div className="filter-card">
          <div className="filter-left">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
          <div className="filter-right">
            {/* small sort dropdown — keep your existing SortDropdown if present */}
            <select className="filter-pill" value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
              <option value="name_asc">Customer Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total units sold</h3>
            <p>{data?.total ?? 0}</p>
          </div>
          <div className="summary-card">
            <h3>Total Amount</h3>
            <p>₹{data?.totalAmount ?? 0}</p>
          </div>
          <div className="summary-card">
            <h3>Total Discount</h3>
            <p>₹{data?.totalDiscount ?? 0}</p>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <strong>Transactions</strong>
          </div>

          {loading ? <div style={{padding:20}}>Loading...</div> :
            <SalesTable rows={data?.results ?? []} />
          }

          <div className="pagination">
            <Pagination page={page} setPage={setPage} totalPages={data?.totalPages ?? 1} />
          </div>
        </div>
      </main>
    </div>
  );
}
