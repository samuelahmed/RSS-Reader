import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Feeds from "@/components/Feed";

export default function Home() {
  return (
    <main className="min-h-screen flex overscroll-none overflow-hidden">
      {/* Chore: create a way to hide / show the sidebar on mobile */}
      <Sidebar />
      
      
      <div className="flex flex-col w-full">
        <Header />
        {/* <div className="flex-grow"> */}
        <Feeds />
        {/* </div> */}
        <Footer />  
          </div>
    </main>
  );
}
