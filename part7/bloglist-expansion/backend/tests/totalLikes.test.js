const totalLikes = require("../utils/list_helper").totalLikes;

describe("totalLikes", () => {
  test("of one value is the value itself", () => {
    const blogs = [{ likes: 1 }];
    expect(totalLikes(blogs)).toBe(1);
  });

  test("of many is calculated right", () => {
    const blogs = [{ likes: 1 }, { likes: 2 }, { likes: 3 }];
    expect(totalLikes(blogs)).toBe(6);
  });

  test("of empty array is zero", () => {
    expect(totalLikes([])).toBe(0);
  });
});
