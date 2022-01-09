class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // product ssearch by category

    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    console.log(queryCopy);

    //advance filter like price,rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}

module.exports = ApiFeatures;
