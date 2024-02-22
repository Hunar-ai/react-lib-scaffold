import StringUtils from "./StringUtils";

describe("Test StringUtils.extractMatchingTagsWithTextFromHtmlStr", () => {
  test("function should be defined", () => {
    expect(StringUtils.extractMatchingTagsWithTextFromHtmlStr).toBeDefined();
  });

  test("should return an array if match is found", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "em",
      "<em> testing </em>"
    );
    expect(result instanceof Array).toBe(true);
  });

  test("should return null if match is not found", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "em",
      "testing"
    );
    expect(result).toBe(null);
  });

  test("should return an array of length 2", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "em",
      "<em> testing </em>, <em> testing... </em>"
    );
    expect(result.length).toEqual(2);
  });

  test("should return an array with matching value test 1", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "em",
      "<em>testing</em>"
    );
    const expectedResult = ["<em>testing</em>"];
    expect(result).toEqual(expectedResult);
  });

  test("should return an array with matching value test 2", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "em",
      "<span><em>testing</em><span><p>hello</p>"
    );
    const expectedResult = ["<em>testing</em>"];
    expect(result).toEqual(expectedResult);
  });

  test("should return an array with matching value test 3", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "span",
      "<em>hello</em><span>testing</span><p>hello</p>"
    );

    const expectedResult = ["<span>testing</span>"];
    expect(result).toEqual(expectedResult);
  });

  test("should return an array with matching value test 4", () => {
    const result = StringUtils.extractMatchingTagsWithTextFromHtmlStr(
      "span",
      "<em>hello</em><span>testing</span><p>hello</p><span>hello</span>"
    );

    const expectedResult = ["<span>testing</span>", "<span>hello</span>"];
    expect(result).toEqual(expectedResult);
  });
});

describe("Test StringUtils.removeTagFromText", () => {
  test("function should be defined", () => {
    expect(StringUtils.removeTagFromText).toBeDefined();
  });

  test("should return a string type", () => {
    const result = StringUtils.removeTagFromText("em", "<em> testing </em>");
    expect(typeof result).toBe("string");
  });

  test("should return a string with tag removed test 1", () => {
    const result = StringUtils.removeTagFromText("em", "<em> testing </em>");
    expect(result).toBe(" testing ");
  });

  test("should return a string with tag removed test 2", () => {
    const result = StringUtils.removeTagFromText(
      "em",
      "hello world <em> testing </em> hello again <em>testing...</em>"
    );
    expect(result).toBe("hello world  testing  hello again testing...");
  });
});

describe("Test StringUtils.toSentenceCaseFromMixedCase", () => {
  test("should return a string in sentence case", () => {
    const result = StringUtils.toSentenceCaseFromMixedCase(
      "New Riders are successfully created. Please check your email for the Passwords."
    );
    expect(result).toBe(
      "New riders are successfully created. Please check your email for the passwords."
    );
  });
});
