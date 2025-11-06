export default function Book({book}){
  //book display with image title rating author
    return(
        <div className="w-50 sm:w-58 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 italic mb-2">{book.author}</p>
         <p className="text-sm text-yellow-600 font-semibold mb-2">
        ⭐ Rating: {book.irating}/5
      </p>
      </div>
    </div>
       
    )
}


