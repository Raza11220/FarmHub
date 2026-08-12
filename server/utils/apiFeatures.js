class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "search", "fields"];
    const filtered = { ...queryObj };

    excludedFields.forEach((field) => delete filtered[field]);

    Object.entries(filtered).forEach(([key, value]) => {
      if (typeof value === "string" && value.includes(",")) {
        filtered[key] = value.split(",").map((item) => item.trim());
      }
    });

    this.query = this.query.find(filtered);
    return this;
  }

  search(fields = ["name"]) {
    const searchTerm = this.queryString.search;

    if (!searchTerm) return this;

    const searchRegex = new RegExp(searchTerm, "i");
    const searchQuery = {
      $or: fields.map((field) => ({ [field]: searchRegex })),
    };

    this.query = this.query.find(searchQuery);
    return this;
  }

  sort() {
    const sortBy = this.queryString.sort;

    if (sortBy) {
      const sortFields = sortBy.split(",").join(" ");
      this.query = this.query.sort(sortFields);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;

    return this;
  }
}

export default ApiFeatures;
