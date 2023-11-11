import { GET } from "../src/app/api/getXML/route"; // replace 'yourFile' with the actual file name
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("GET", () => {
  let consoleError: any;

  beforeEach(() => {
    fetchMock.resetMocks();
    consoleError = jest.spyOn(console, "error");
    // Silence console.error for cleaner test output
    consoleError.mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleError.mockRestore();
  });

  it("returns an error response when the URL is empty", async () => {
    const response = await GET({ url: "http://localhost?feedUrl=" });
    expect(response.status).toBe(400);
  });

  it("adds a nocache query parameter for non-YouTube URLs", async () => {
    const url = "http://example.com";
    fetchMock.mockResponseOnce("<rss></rss>");
    await GET({ url: `http://localhost?feedUrl=${encodeURIComponent(url)}` });
    expect(fetchMock.mock.calls[0][0]).toContain("nocache");
  });

  it("returns an error response when the fetch request fails", async () => {
    fetchMock.mockRejectOnce(new Error("Fetch error"));
    const response = await GET({
      url: "http://localhost?feedUrl=http://example.com",
    });
    expect(response.status).toBe(500);
  });

  it("correctly parses XML data to JSON", async () => {
    const xmlData = "<rss><channel><item>Test</item></channel></rss>";
    fetchMock.mockResponseOnce(xmlData, {
      headers: { "Content-Type": "application/xml" },
    });
    const response = await GET({
      url: "http://localhost?feedUrl=http://example.com",
    });
    const jsonData = await response.json();
    expect(jsonData).toEqual({ rss: { channel: { item: "Test" } } });
  });

  it("limits the number of items to 100", async () => {
    const xmlData =
      "<rss><channel>" + "<item>Test</item>".repeat(101) + "</channel></rss>";
    fetchMock.mockResponseOnce(xmlData);
    const response = await GET({
      url: "http://localhost?feedUrl=http://example.com",
    });
    const jsonData = await response.json();
    expect(jsonData.rss.channel.item.length).toBe(100);
  });

  it("returns an error response when an error occurs", async () => {
    fetchMock.mockImplementationOnce(() => {
      throw new Error("Test error");
    });
    const response = await GET({
      url: "http://localhost?feedUrl=http://example.com",
    });
    expect(response.status).toBe(500);
  });
});
