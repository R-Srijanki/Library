import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const data = useSelector((state) => state.book.items);
  
  const filtereddata = data.find((item) => item.id == id);

  if (!filtereddata) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-green to-yellow-200 p-6">
  {/* 🔙 Back Link */}
  <div className="mb-4 text-right">
    <Link
      to="/books"
      className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
    >
      ← Back to Browse Page
    </Link>
  </div>

  {/* 📖 Book Details Card */}
  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
    {/* 📘 Book Image */}
    <div className="md:w-1/2 flex justify-center items-center bg-gray-50 p-5">
      <img
        src={filtereddata.imageUrl}
        alt={filtereddata.title}
        className="w-60 h-80 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* 🧾 Book Info */}
    <div className="md:w-1/2 p-6 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">{filtereddata.title}</h1>
      <div className="mb-4 flex">
          <span className="mt-0.5 text-gray-600">by</span>
          <h3 className="text-lg font-semibold border-r px-3">{filtereddata.author}</h3>
         <span className="border-r px-3 mt-0.5">{filtereddata.year}</span>
          <span className="px-3 mt-0.5">{filtereddata.pages} pages</span>
      </div>

      <p className="text-sm text-yellow-600 font-semibold mb-3">
        ⭐ Rating: {filtereddata.irating}/5
      </p>

      <p className="text-gray-700 leading-relaxed text-justify mb-4">
        {filtereddata.description}
      </p>
    </div>
  </div>
</div>
  );
}



// <h3 className="text-lg text-gray-600 mb-4 italic">{filtereddata.author}  |  {filtereddata.year}  |  {filtereddata.pages} pages</h3>