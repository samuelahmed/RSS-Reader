"use client";

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Feed from "@/components/Feed";
import { useState } from "react";

export default function MainPageLayout() {
  
  const [feedURL, setFeedURL] = useState("");
  const [headerFeedInformation, setHeaderFeedInformation] = useState({
    title: "No feed selected",
    numberOfItems: 0,
  });

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden text-gray-200">
      <Sidebar
        setHeaderFeedInformation={setHeaderFeedInformation}
        setFeedURL={setFeedURL}
      />
      <div className="flex flex-col w-full">
        <Header headerFeedInformation={headerFeedInformation} />
        <Feed
          setHeaderFeedInformation={setHeaderFeedInformation}
          feedURL={feedURL}
        />
      </div>
    </main>
  );
}
