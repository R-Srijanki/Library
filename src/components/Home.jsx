import { useSelector } from "react-redux";
import Book from "../../../components/Book";
import './style.css'
import { Link } from "react-router-dom";

export default function Home(){
    const books=useSelector((state)=>state.book.items);
    const topBooks=[...books].sort((a,b)=>b.irating-a.irating).slice(0,6);
    return(
  <div className="w-screen h-screen bg-gradient-to-r from-blue-500 to-green-500 overflow-y-auto">
    {/* Header Section */}
    <div className="text-center py-6 bg-white/70 backdrop-blur-md shadow-md border-b">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2 font-serif break-normal">
        Welcome to Your Secret Library of Dreams!
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base italic break-normal">
        Uncover hidden tales, breathe life into your imagination, and let your
        creativity bloom in our enchanted world of books.
      </p>
    </div>

    <div className="flex h-[calc(100vh-100px)]">
      {/* Sidebar */}
      <aside className="w-1.3/4 sm:w-1/5 bg-white/70 backdrop-blur-lg border-r border-gray-200 p-3 sm:p-5 overflow-y-auto shadow-md">
        <h1 className="text-center text-2xl font-semibold text-indigo-600 mb-4 font-serif">
          Universe
        </h1>
        <nav className="flex flex-col space-y-3">
          {[
            "Fiction",
            "Adventure",
            "Mystery",
            "Classic",
            "Thriller",
            "Romance",
            "Fantasy",
            "Horror",
          ].map((category) => (
            <Link
              key={category}
              to={`books/${category.toLowerCase()}`}
              className="text-gray-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700 font-sans text-lg"
            >
              {category}
            </Link>
          ))}
        </nav>
      </aside>

      {/*  Main Content */}
      <main className="flex-1 bg-white/50 backdrop-blur-md p-6 overflow-y-auto">
        <h1 className="text-center text-2xl font-bold text-indigo-700 border-b pb-3 mb-6 font-serif">
          Top Collections
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {topBooks.map((item) => (
            <Link
              key={item.id}
              to={`/books/details/${item.id}`}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Book book={item} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  </div>
)
}