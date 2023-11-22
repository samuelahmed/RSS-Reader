"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feed from "@/components/Feed";
import { useState } from "react";
import useMainKeyboardNavigation from "@/hooks/useMainKeyboardNav";

export default function MainPageLayout() {
  
  const [headerFeedInformation, setHeaderFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: 0,
  });

  const [feedURL, setFeedURL] = useState("");
  const [isMainFeedFocused, setIsMainFeedFocused] = useState(true);
  const [focusedComponent, setFocusedComponent] = useState("sidebar");
  const [showModal, setShowModal] = useState(false);
  const isKeyboardNav = useMainKeyboardNavigation();

  return (
    <main
      className={`flex flex-col h-screen overscroll-none overflow-hidden text-gray-200 ${
        isKeyboardNav ? "keyboard-nav" : ""
      }`}
    >
      <Header headerFeedInformation={headerFeedInformation} />

      <div className="flex flex-row w-full">
        <div className="w-6/12 md:w-2/12">
          <Sidebar
            setHeaderFeedInformation={setHeaderFeedInformation}
            setFeedURL={setFeedURL}
            setIsMainFeedFocused={setIsMainFeedFocused}
            isMainFeedFocused={isMainFeedFocused}
            focusedComponent={focusedComponent}
            setFocusedComponent={setFocusedComponent}
            showModal={showModal}
          />
        </div>

        <div className="w-full">
          <Feed
            setHeaderFeedInformation={setHeaderFeedInformation}
            feedURL={feedURL}
            setIsMainFeedFocused={setIsMainFeedFocused}
            isMainFeedFocused={isMainFeedFocused}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </main>
  );
}
