import { useEffect, useState } from "react";
import api from "../services/api";

export default function FilterBar({ filters, setFilters }) {
  const [tagsOptions, setTagsOptions] = useState([]);

  // Load tags from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/tags");
        setTagsOptions(res.data.tags || []);
      } catch (err) {
        console.log("Tags load error:", err);
      }
    })();
  }, []);

  return (
    <>
      <div className="filter-pill">
        <label>Region</label>
        <select
          value={filters.region || "All"}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        >
          <option>All</option>
          <option>North</option>
          <option>South</option>
        </select>
      </div>

      <div className="filter-pill">
        <label>Gender</label>
        <select
          value={filters.gender || "All"}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="filter-pill">
        <input
          className="age-input"
          placeholder="Min Age"
          value={filters.ageMin || ""}
          onChange={(e) =>
            setFilters({ ...filters, ageMin: e.target.value })
          }
        />
      </div>

      <div className="filter-pill">
        <input
          className="age-input"
          placeholder="Max Age"
          value={filters.ageMax || ""}
          onChange={(e) =>
            setFilters({ ...filters, ageMax: e.target.value })
          }
        />
      </div>

      <div className="filter-pill">
        <label>Category</label>
        <select
          value={filters.category || "All"}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option>All</option>
          <option>Clothing</option>
          <option>Electronics</option>
        </select>
      </div>

      {/* ⭐ NEW TAGS MULTI SELECT ⭐ */}
      <div className="filter-pill">
        <label>Tags</label>
        <select
          multiple
          value={filters.tags || []}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (opt) => opt.value
            );
            setFilters({ ...filters, tags: selected });
          }}
          style={{ minWidth: "120px", height: "70px" }}
        >
          {tagsOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
