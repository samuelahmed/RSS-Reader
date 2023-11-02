"use client";

import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Feeds from "@/components/Feed";
import { useState } from "react";

export default function MainPageLayout() {
  //state for the feed
  const [feedURL, setFeedURL] = useState("");
  // console.log(feedURL)

  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden">
      {/* Chore: create a way to hide / show the sidebar on mobile */}
      <Sidebar setFeedURL={setFeedURL} />

      <div className="flex flex-col w-full">
        <Header />
        {/* <div className="flex-grow"> */}
        <Feeds feedURL={feedURL} />
        {/* </div> */}
        <Footer />
      </div>
    </main>
  );
}
