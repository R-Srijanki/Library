import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Book from "./Book";
import './style.css'

export default function BrowseBooks() {
  const params = useParams();
  const allBooks = useSelector((state) => state.book.items);
  const [bookdet, setdet] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  // ✅ Search handler
  function handleSearch() {
    if (bookdet.trim() === "") {
      setFilteredBooks(allBooks);
      return;
    }

    const searchResult = allBooks.filter(
      (item) =>
        item.author.toLowerCase().includes(bookdet.toLowerCase()) ||
        item.title.toLowerCase().includes(bookdet.toLowerCase())
    );
    setFilteredBooks(searchResult);
  }

  // ✅ Input handler
  function handleInput(e) {
    setdet(e.target.value);
  }

  // ✅ Category-specific view
  if (params.category) {
    const categoryBooks = filteredBooks.filter((item) =>
      item.genre.toLowerCase().includes(params.category.toLowerCase())
    );

    return (
      <div className="bg-gradient-to-r from-blue-300 to-green-300 min-h-screen overflow-y-auto">
        <div className="flex justify-center items-center py-4 bg-gray-100 shadow-sm ">
          <input
            type="text"
            placeholder="Search by title or author"
            value={bookdet}
            onChange={handleInput}
            className="placeholder-gray-500 w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2 transition-all duration-200"
          />
          <button onClick={handleSearch} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
        </div>

        <h1 className="capitalize text-center text-3xl font-semibold text-indigo-600 my-6 font-serif">
          {params.category} Books
        </h1>
        <div className="flex flex-wrap gap-6 mb-6 justify-center items-center">
          {categoryBooks.length > 0 ? (
            categoryBooks.map((item) => (
              <Link key={item.id} to={`/books/details/${item.id}`} className="transform hover:scale-105 transition-transform duration-200">
                <Book book={item} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500 italic text-lg">No books found for this category.</p>
          )}
        </div>
      </div>
    );
  }

  // ✅ All categories view (when no param)
  // Group books by category
  const categoryGroups = {};
  filteredBooks.forEach((book) => {
      let cat=book.genre.toLowerCase();
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(book);
});
  

  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 min-h-screen overflow-y-auto">
      <div className="flex justify-center items-center py-4 bg-gray-100 shadow-sm ">
        <input
          type="text"
          placeholder="Search by title or author"
          value={bookdet}
          onChange={handleInput}
          className="placeholder-gray-500 w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2 transition-all duration-200"
        />
        <button onClick={handleSearch} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center">
          <i className="fa-solid fa-magnifying-glass text-lg"></i>
        </button>
      </div>

      {Object.keys(categoryGroups).length > 0 ? (
        Object.keys(categoryGroups).map((cat) => (
          <div key={cat} className="my-10">
            <h1 className="capitalize text-center text-2xl md:text-3xl font-semibold text-indigo-600 mb-6 font-serif">{cat}</h1>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {categoryGroups[cat].map((item) => (
                <Link key={item.id} to={`/books/details/${item.id}`} className="transform hover:scale-105 transition-transform duration-200">
                  <Book book={item} />
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic text-center text-lg mt-10">No books available.</p>
      )}
    </div>
  );
}