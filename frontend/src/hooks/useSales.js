import { useEffect, useState } from "react";
import api from "../services/api";

export default function useSales() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    category: "",
    payment: "",
    ageMin: "",
    ageMax: "",
    startDate: "",
    endDate: "",
  });

  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);

      const params = {};
      if (search) params.search = search;
      if (filters.region) params.region = filters.region;
      if (filters.gender) params.gender = filters.gender;
      if (filters.category) params.category = filters.category;
      if (filters.payment) params.payment = filters.payment;

      if (filters.ageMin) params.ageMin = filters.ageMin;
      if (filters.ageMax) params.ageMax = filters.ageMax;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      params.sort = sort;
      params.page = page;

      const res = await api.get("/sales", { params });
      setData(res.data);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [search, filters, sort, page]);

  return {
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
  };
}
