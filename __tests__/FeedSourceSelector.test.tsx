/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"; // import this
import { render, fireEvent } from "@testing-library/react";
import FeedSourceSelector from "../src/components/FeedSourceSelector";
import newsFeedData from "../src/feedSources/newsFeedSources";
import youtubeFeedData from "../src/feedSources/youtubeFeedSources";
import podcastFeedData from "../src/feedSources/podcastFeedSources";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

describe("FeedSourceSelector", () => {
  const dummySetFeedURL = jest.fn();
  const dummySetCurrentFeedInformation = jest.fn();

  it("renders the News feed", () => {
    const { getByText } = render(
      <FeedSourceSelector
        setFeedURL={dummySetFeedURL}
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    expect(getByText("News Feeds")).toBeInTheDocument();
  });

  it("renders the Youtube feed", () => {
    const { getByText } = render(
      <FeedSourceSelector
        setFeedURL={dummySetFeedURL}
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    expect(getByText("Youtube Feeds")).toBeInTheDocument();
  });

  it("renders the Podcast feed", () => {
    const { getByText } = render(
      <FeedSourceSelector
        setFeedURL={dummySetFeedURL}
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    expect(getByText("Podcast Feeds")).toBeInTheDocument();
  });

  it("renders the correct number of feed items", () => {
    const { container } = render(
      <FeedSourceSelector
        setFeedURL={dummySetFeedURL}
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    const feedItems = container.querySelectorAll("div.cursor-pointer");
    expect(feedItems).toHaveLength(
      newsFeedData.length + youtubeFeedData.length + podcastFeedData.length
    );
  });

  it("calls setFeedURL and setCurrentFeedInformation with correct arguments when a feed item is clicked", async () => {
    const { getByText } = render(
      <FeedSourceSelector
        setFeedURL={dummySetFeedURL}
        setCurrentFeedInformation={dummySetCurrentFeedInformation}
      />
    );
    await act(async () => {
      fireEvent.click(getByText(newsFeedData[0].title));
    });
    expect(dummySetFeedURL).toHaveBeenCalledWith(newsFeedData[0].url);
    expect(dummySetCurrentFeedInformation).toHaveBeenCalledWith({
      title: newsFeedData[0].title,
    });
  });
});
