/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"; // import this
import { render, fireEvent } from "@testing-library/react";
import FeedSourceSelector from "../src/components/FeedSourceSelector";
import newsFeedData from "../src/feedSources/newsFeedSources";
import youtubeFeedData from "../src/feedSources/youtubeFeedSources";
import podcastFeedData from "../src/feedSources/podcastFeedSources";
import techFeedData from "@/feedSources/techFeedSources";
import devFeedData from "@/feedSources/devFeedSources";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

describe("FeedSourceSelector", () => {
  const dummySetFeedURL = jest.fn();
  const dummysetHeaderFeedInformation = jest.fn();
  const dummySetIsMainFeedFocused = jest.fn();

  beforeEach(() => {
    // Mock scrollIntoView method
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  describe("FeedSourceSelector", () => {
    it("renders the News feed", () => {
      const { getByText } = render(
        <FeedSourceSelector
          setFeedURL={dummySetFeedURL}
          setHeaderFeedInformation={dummysetHeaderFeedInformation}
          setIsMainFeedFocused={dummySetIsMainFeedFocused}
          isMainFeedFocused={false}
          showModal={false}
        />
      );
      expect(getByText("News")).toBeInTheDocument();
    });

    it("renders the Youtube feed", () => {
      const { getByText } = render(
        <FeedSourceSelector
          setFeedURL={dummySetFeedURL}
          setHeaderFeedInformation={dummysetHeaderFeedInformation}
          setIsMainFeedFocused={dummySetIsMainFeedFocused}
          isMainFeedFocused={false}
          showModal={false}
        />
      );
      expect(getByText("Youtube")).toBeInTheDocument();
    });

    it("renders the Podcast feed", () => {
      const { getByText } = render(
        <FeedSourceSelector
          setFeedURL={dummySetFeedURL}
          setHeaderFeedInformation={dummysetHeaderFeedInformation}
          setIsMainFeedFocused={dummySetIsMainFeedFocused}
          isMainFeedFocused={false}
          showModal={false}
        />
      );
      expect(getByText("Podcast")).toBeInTheDocument();
    });

    it("renders the correct number of feed items", () => {
      const { container } = render(
        <FeedSourceSelector
          setFeedURL={dummySetFeedURL}
          setHeaderFeedInformation={dummysetHeaderFeedInformation}
          setIsMainFeedFocused={dummySetIsMainFeedFocused}
          isMainFeedFocused={false}
          showModal={false}
        />
      );
      const feedItems = container.querySelectorAll("div.cursor-pointer");
      expect(feedItems).toHaveLength(
        newsFeedData.length +
          youtubeFeedData.length +
          podcastFeedData.length +
          techFeedData.length +
          devFeedData.length
      );
    });

    it("calls setFeedURL and setCurrentFeedInformation with correct arguments when a feed item is clicked", async () => {
      const { getByText } = render(
        <FeedSourceSelector
          setFeedURL={dummySetFeedURL}
          setHeaderFeedInformation={dummysetHeaderFeedInformation}
          setIsMainFeedFocused={dummySetIsMainFeedFocused}
          isMainFeedFocused={false}
          showModal={false}
        />
      );
      await act(async () => {
        fireEvent.click(getByText(newsFeedData[0].title));
      });
      expect(dummySetFeedURL).toHaveBeenCalledWith(newsFeedData[0].url);
      expect(dummysetHeaderFeedInformation).toHaveBeenCalledWith({
        title: newsFeedData[0].title,
      });
    });
  });
});
