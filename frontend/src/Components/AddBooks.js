function AddBooks({
  handleBookSubmit,
  handleBookCancel,
  handleBookChange,
  book_author,
  book_name,
  book_price,
  book_stock,
  book_genre,
}) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div>
        <h1 className="text-3xl font-bold text-center mb-5">Add Books</h1>
        <p className="text-center text-gray-500">
          Fill in the details to add a new book.
        </p>
        <p className="text-center text-gray-500">
          Please make sure the book is not already registered.
        </p>
        <p className="text-center text-gray-500">
          You can check the stock in the books section.
        </p>
      </div>
      <form
        onSubmit={handleBookSubmit}
        className="gap-6 mb-2 md:grid-cols-2 max-w-sm mx-auto"
        style={{ marginTop: "2rem" }}
      >
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book Name
          </label>
          <input
            type="text"
            id="book_name"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Name of the book"
            onChange={handleBookChange}
            value={book_name}
            name="book_name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book Author
          </label>
          <input
            type="text"
            id="book_author"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Author of the book"
            required
            onChange={handleBookChange}
            value={book_author}
            name="book_author"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book Price
          </label>
          <input
            type="number"
            id="book_price"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Renting Price of the book"
            required
            onChange={handleBookChange}
            value={book_price}
            name="book_price"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book Stock
          </label>
          <input
            type="number"
            id="book_stock"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Quantity in Stock"
            required
            onChange={handleBookChange}
            value={book_stock}
            name="book_stock"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="book_genre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Book Genre
          </label>
          <select
            value={book_genre}
            onChange={handleBookChange}
            name="book_genre"
            id="book_genre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select Genre" disabled />
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
            <option value="Rock">Rock</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Book
          </button>
          <button
            type="submit"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleBookCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBooks;
