export default function Header({ headerFeedInformation }: any) {
  
  return (
    <header
      className="sticky top-0 z-50 w-full px-1 text-center text-gray-200 border-y-2 border-white"
      style={{ backgroundColor: "rgb(var(--background-rgb))" }}
    >
      {headerFeedInformation && headerFeedInformation.title
        ? headerFeedInformation.title
        : "No feed selected"}
      &nbsp;&nbsp;&nbsp;
      {headerFeedInformation && headerFeedInformation.numberOfItems
        ? headerFeedInformation.numberOfItems + " " + "items "
        : ""}
    </header>
  );
}
