"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feed from "@/components/Feed";
import { useState, useEffect } from "react";

export default function MainPageLayout() {
  const [headerFeedInformation, setHeaderFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: 0,
  });
  const [feedURL, setFeedURL] = useState("");
  const [isMainFeedFocused, setIsMainFeedFocused] = useState(true);
  const [focusedComponent, setFocusedComponent] = useState("sidebar");
  const [showModal, setShowModal] = useState(false);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  const handleKeyDown = () => {
    setIsKeyboardNav(true);
  };

  const handleMouseMove = () => {
    setIsKeyboardNav(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main
      className={`min-h-screen flex overscroll-none overflow-hidden text-gray-200 ${
        isKeyboardNav ? "keyboard-nav" : ""
      }`}
    >
      <Sidebar
        setHeaderFeedInformation={setHeaderFeedInformation}
        setFeedURL={setFeedURL}
        setIsMainFeedFocused={setIsMainFeedFocused}
        isMainFeedFocused={isMainFeedFocused}
        focusedComponent={focusedComponent}
        setFocusedComponent={setFocusedComponent}
        showModal={showModal}
      />
      <div className="flex flex-col w-full">
        <Header headerFeedInformation={headerFeedInformation} />
        <Feed
          setHeaderFeedInformation={setHeaderFeedInformation}
          feedURL={feedURL}
          setIsMainFeedFocused={setIsMainFeedFocused}
          isMainFeedFocused={isMainFeedFocused}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </main>
  );
}
