const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

test("list with many items returns one", () => {
  const blogs = [1, 2, 4, 5];
  expect(listHelper.dummy(blogs)).toBe(1);
});
