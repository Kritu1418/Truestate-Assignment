const db = require('../utils/db');

// GET /api/sales
exports.getSales = (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      category,
      tags,
      payment,
      sort,
      page = 1,
      ageMin,
      ageMax,
      dateFrom,
      dateTo
    } = req.query;

    let where = [];
    let params = [];

    // SEARCH (CustomerName OR PhoneNumber)
    if (search) {
      where.push("(CustomerName LIKE ? OR PhoneNumber LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    // REGION
    if (region) {
      const items = region.split(",");
      where.push(`CustomerRegion IN (${items.map(() => "?").join(",")})`);
      params.push(...items);
    }

    // GENDER
    if (gender) {
      const items = gender.split(",");
      where.push(`Gender IN (${items.map(() => "?").join(",")})`);
      params.push(...items);
    }

    // CATEGORY
    if (category) {
      const items = category.split(",");
      where.push(`ProductCategory IN (${items.map(() => "?").join(",")})`);
      params.push(...items);
    }

    // TAGS — MULTI TAG FILTER
    if (tags) {
      const items = tags.split(",").map(t => t.trim()).filter(Boolean);
      if (items.length) {
        const likeClauses = items.map(() => "Tags LIKE ?");
        where.push("(" + likeClauses.join(" OR ") + ")");
        items.forEach(t => params.push(`%${t}%`));
      }
    }

    // PAYMENT METHOD
    if (payment) {
      const items = payment.split(",");
      where.push(`PaymentMethod IN (${items.map(() => "?").join(",")})`);
      params.push(...items);
    }

    // AGE RANGE
    if (ageMin) {
      where.push("Age >= ?");
      params.push(ageMin);
    }

    if (ageMax) {
      where.push("Age <= ?");
      params.push(ageMax);
    }

    // DATE RANGE
    if (dateFrom) {
      where.push("Date >= ?");
      params.push(dateFrom);
    }

    if (dateTo) {
      where.push("Date <= ?");
      params.push(dateTo);
    }

    const whereQuery = where.length ? `WHERE ${where.join(" AND ")}` : "";

    // SORTING
    let sortQuery = "";
    if (sort === "date") sortQuery = "ORDER BY Date DESC";
    if (sort === "quantity") sortQuery = "ORDER BY Quantity DESC";
    if (sort === "name") sortQuery = "ORDER BY CustomerName ASC";

    // PAGINATION
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // TOTAL COUNT
    const totalStmt = db.prepare(`SELECT COUNT(*) AS count FROM sales ${whereQuery}`);
    const total = totalStmt.get(...params).count;

    // FETCH DATA
    const fetchStmt = db.prepare(`
      SELECT *
      FROM sales
      ${whereQuery}
      ${sortQuery}
      LIMIT ? OFFSET ?
    `);

    const results = fetchStmt.all(...params, pageSize, offset);

    res.json({
      page: Number(page),
      total,
      totalPages: Math.ceil(total / pageSize),
      results
    });

  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/tags
exports.getTags = (req, res) => {
  try {
    const rows = db.prepare(
      "SELECT Tags FROM sales WHERE Tags IS NOT NULL AND Tags <> ''"
    ).all();

    const set = new Set();

    rows.forEach(r => {
      r.Tags.split(",").forEach(t => {
        const tag = t.trim();
        if (tag) set.add(tag);
      });
    });

    res.json({ tags: Array.from(set).sort() });

  } catch (error) {
    console.log("Tags error", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};
