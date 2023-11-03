"use client";

import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Feeds from "@/components/Feed";
import { useState } from "react";

export default function MainPageLayout() {
  const [feedURL, setFeedURL] = useState("");

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden">
      {/* Chore: create a way to hide / show the sidebar on mobile */}
      <Sidebar setFeedURL={setFeedURL} />
      <div className="flex flex-col w-full">
        <Header />
        <Feeds 
        feedURL={feedURL} 
        // will I need to pass the feedURL to the Feeds component?
        // feedURL={feedURL}
        />
        <Footer />
      </div>
    </main>
  );
}
