"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feed from "@/components/Feed";
import { useState } from "react";

export default function MainPageLayout() {
  
  const [feedURL, setFeedURL] = useState("");
  const [currentFeedInformation, setCurrentFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: "",
  });

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden text-gray-200">
      <Sidebar
        setCurrentFeedInformation={setCurrentFeedInformation}
        setFeedURL={setFeedURL}
      />
      <div className="flex flex-col w-full">
        <Header currentFeedInformation={currentFeedInformation} />
        <Feed
          setCurrentFeedInformation={setCurrentFeedInformation}
          feedURL={feedURL}
        />
      </div>
    </main>
  );
}
