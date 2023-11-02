export default function Page({ params }: { params: { id: string } }) {

    //get article ID from url? can I use the ID from data array to get the right article?


    return (
    <div>My Post: {params.id}</div>
    //add title 
    //add date 
    //add content 
    )

  }
  










  // in future - add way to note the article has been read (need a db for this)
