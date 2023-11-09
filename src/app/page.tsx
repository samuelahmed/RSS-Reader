"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feeds from "@/components/Feed";
import { useState } from "react";

export default function MainPageLayout() {
  const [feedURL, setFeedURL] = useState("");
  const [currentFeedInformation, setCurrentFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: "",
  });

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden text-gray-200">
      {/* Chore: create a way to hide / show the sidebar on mobile */}
      <Sidebar
        setCurrentFeedInformation={setCurrentFeedInformation}
        setFeedURL={setFeedURL}
      />
      <div className="flex flex-col w-full">
        <Header currentFeedInformation={currentFeedInformation} />
        <Feeds
          setCurrentFeedInformation={setCurrentFeedInformation}
          feedURL={feedURL}
        />
      </div>
    </main>
  );
}
