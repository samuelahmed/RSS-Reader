"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feed from "@/components/Feed";
import { useState, useEffect } from "react";

export default function MainPageLayout() {
  
  const [feedURL, setFeedURL] = useState("");
  const [headerFeedInformation, setHeaderFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: 0,
  });
  const [isMainFeedFocused, setIsMainFeedFocused] = useState(true);

  const [focusedComponent, setFocusedComponent] = useState('sidebar'); // new state variable

  const [showModal, setShowModal] = useState(false); // Add this line

console.log(focusedComponent)

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden text-gray-200">
      <Sidebar
        setHeaderFeedInformation={setHeaderFeedInformation}
        setFeedURL={setFeedURL}
        setIsMainFeedFocused={setIsMainFeedFocused}
        isMainFeedFocused={isMainFeedFocused}
        focusedComponent={focusedComponent}
        setFocusedComponent={setFocusedComponent}
        showModal={showModal} // Pass showModal and setShowModal to Sidebar

      />
      <div className="flex flex-col w-full">
        <Header headerFeedInformation={headerFeedInformation} />
        <Feed
          setHeaderFeedInformation={setHeaderFeedInformation}
          feedURL={feedURL}
          setIsMainFeedFocused={setIsMainFeedFocused}
          isMainFeedFocused={isMainFeedFocused}
          showModal={showModal} // Pass showModal and setShowModal to Feed
          setShowModal={setShowModal}
        />
      </div>
    </main>
  );
}
