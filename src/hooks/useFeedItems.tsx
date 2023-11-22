import { useState, useEffect } from "react";
import useFeedData from "./useFeedData";
import useAllItems from "./useAllItems";
import { FeedItem } from "../utils/types";

export default function useFeedItems(feedURL: string) {
  
  const [focusedItem, setFocusedItem] = useState<FeedItem | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const serverDataFromHook = useFeedData(feedURL);
  const [serverData, setServerData] = useState(serverDataFromHook);
  const allItems = useAllItems(serverData);

  // Update serverData when serverDataFromHook changes
  useEffect(() => {
    setServerData(serverDataFromHook);
  }, [serverDataFromHook]);

  // Update focused item when focusedItemIndex changes
  useEffect(() => {
    setFocusedItem(allItems[focusedItemIndex] || null);
  }, [focusedItemIndex, serverData]);

  // Set the first item as the focused item when serverData changes
  useEffect(() => {
    setFocusedItem(allItems[0] || null);
    setFocusedItemIndex(0);
  }, [allItems, serverData]);

  return {
    focusedItem,
    setFocusedItem,
    focusedItemIndex,
    setFocusedItemIndex,
    serverData,
    setServerData,
  };
}
