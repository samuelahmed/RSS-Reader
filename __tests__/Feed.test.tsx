/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Feed from "../src/components/Feed";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Feed component", () => {
    
  const dummySetCurrentFeedInformation = jest.fn();

  it("renders without crashing", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: "12345" }));
    render(
      <Feed
        feedURL="testURL"
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
  });

  it("fetches data from the correct URL and renders it", async () => {
    const dummyData = {
      rss: {
        channel: {
          item: [
            {
              index: 1,
              title: "Test Title",
              pubDate: "2022-01-01T00:00:00Z",
            },
          ],
        },
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(dummyData));
    const { findByText } = render(
      <Feed
        feedURL="testURL"
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    expect(fetch).toHaveBeenCalledWith("/api/getXML?feedUrl=testURL");

    const itemElement = await findByText("Test Title");
    expect(itemElement).toBeInTheDocument();
  });

  it("calls setCurrentFeedInformation when a feed item is clicked", async () => {
    const dummyData = {
      rss: {
        channel: {
          item: [
            {
              index: 1,
              title: "Test Title",
              pubDate: "2022-01-01T00:00:00Z",
            },
          ],
        },
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(dummyData));
    const { findByText } = render(
      <Feed
        feedURL="testURL"
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    const itemElement = await findByText("Test Title");
    
    fireEvent.click(itemElement);
    expect(dummySetCurrentFeedInformation).toHaveBeenCalled();
  });
});
