import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../utils/slice';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const dispatch = useDispatch();//to dispatch action
  const navigate = useNavigate();//to navigate to different page
  const books=useSelector((state)=>state.book.items);//to get items from redux store
 const [successMsg, setSuccessMsg] = useState("");//when book uploaded successfully
  // Consolidate form inputs into a single state object
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    author: '',
    description: '',
    imageUrl: '',
    category: '',
    rating: '',
    year:'',
    pages:''
  });

  // Consolidate error messages into a single state object
  const [formErrors, setFormErrors] = useState({});
//to handle input change and update formData
  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
//when book submit it checks error and navigates to browserbook page
  function handleclick(e) {
     e.preventDefault(); //to prevent default submit
    //to test for proper syntax
    const numcheck=/^[0-9]+$/;
    const chcheck=/^[a-zA-Z.\s]+$/
  //for error check and message for each field error
    const errors = {};
    let hasError = false;

    // Validation logic for each field
    if (!formData.year.trim() && !numcheck.test(formData.year.trim()) && formData.year.trim().length!=4) {
      errors.year = 'Enter a valid year';
      hasError = true;
    }
    if (!formData.pages.trim() && !numcheck.test(formData.pages.trim())) {
      errors.pages = 'Enter a valid no. of pages';
      hasError = true;
    }
    if (!formData.title.trim()) {
      errors.title = 'Enter a valid book title';
      hasError = true;
    }
    //if book exists then enter details again
    if(formData.title.trim().length>0){
       const titleMatch = books.filter((book) => {
            return book.title === formData.title;
        });
        if(titleMatch.length>0){
           errors.title = 'Book already exists';
            hasError = true;
        }
    }//author check
    if (!formData.author.trim() && !chcheck.test(formData.author.trim())) {
      errors.author = 'Enter a valid author name';
      hasError = true;
    }
    //description length
    if (!formData.description.trim() && formData.description.trim().length>20 && formData.description.trim().length<300) {
      errors.description = 'Enter a proper book description';
      hasError = true;
    }
    //image
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'Enter a valid book image URL';
      hasError = true;
    }
    //category
    if (!formData.category.trim()) {
      errors.category = 'Enter a correct category';
      hasError = true;
    }
    //rating of book
    const rate = parseFloat(formData.rating);
    if (isNaN(rate) || rate < 0 || rate > 5) {
      errors.rating = 'Enter a rating between 0 and 5';
      hasError = true;
    }

    setFormErrors(errors);

    // Stop submission if there are errors
    if (hasError) {
      return;
    }

    // Prepare book object for dispatch
    const obj = {
      id: formData.id,
      title: formData.title.trim(),
      author: formData.author.trim(),
      year:formData.year.trim(),
      pages:formData.pages.trim(),
      genre: formData.category.trim(),
      imageUrl: formData.imageUrl.trim(),
      irating: rate,
      description: formData.description.trim(),
    };

    dispatch(addBook(obj));
    //success message after it is added
    setSuccessMsg("✅ New Gem Added successfully! Redirecting...");
   
  }
  useEffect(() => {
    if (!successMsg) return; // only run when there's a message
//after 3s return to home page
    const timer = setTimeout(() => {
      setSuccessMsg("");
       navigate('/books');
    }, 3000);
//clean-up function
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  return (
   <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200 to-green-300 p-4">
    {/* ✅ Floating success message */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] text-lg font-medium animate-fade-slide">
          {successMsg}
        </div>
    )}
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <h1 className="pb-6 text-center text-3xl font-bold text-gray-800 font-serif">Add a New Gem</h1>
        <form className="space-y-6" onSubmit={handleclick}>
         {/*to collect details about book and display error message if it exists*/}
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              placeholder="Book title"
              value={formData.title}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
          </div>

          <div>
            <label htmlFor="author" className="mb-1 block text-sm font-medium text-gray-700">Author</label>
            <input
              id="author"
              type="text"
              onChange={handleChange}
              placeholder="Book author"
              value={formData.author}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.author && <p className="mt-1 text-sm text-red-500">{formErrors.author}</p>}
          </div>

           <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              id="year"
              onChange={handleChange}
              placeholder="Year"
              value={formData.year}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.year && <p className="mt-1 text-sm text-red-500">{formErrors.year}</p>}
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              onChange={handleChange}
              placeholder="Summary of Book"
              value={formData.description}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            ></textarea>
            {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
          </div>

           <div>
            <label htmlFor="pages" className="mb-1 block text-sm font-medium text-gray-700">No. of Pages</label>
            <input
              type="number"
              id="pages"
              onChange={handleChange}
              placeholder="Pages"
              value={formData.pages}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.pages && <p className="mt-1 text-sm text-red-500">{formErrors.pages}</p>}
          </div>

          <div>
            <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              onChange={handleChange}
              placeholder="Book Image"
              value={formData.imageUrl}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.imageUrl && <p className="mt-1 text-sm text-red-500">{formErrors.imageUrl}</p>}
          </div>

          <div>
            <label htmlFor="rating" className="mb-1 block text-sm font-medium text-gray-700">Rating</label>
            <input
              id="rating"
              type="number"
              min="0" max="5"
              step="0.1"
              onChange={handleChange}
              placeholder="Rating"
              value={formData.rating}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.rating && <p className="mt-1 text-sm text-red-500">{formErrors.rating}</p>}
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              onChange={handleChange}
              placeholder="Category"
              value={formData.category}
              className="placeholder-gray-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {formErrors.category && <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>}
          </div>
          {/*submit on adding all details properly */}
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );

}