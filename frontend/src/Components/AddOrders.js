import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddOrder({
  handleOrderChange,
  handleOrderSubmit,
  handelOrderFormCancel,
  customer_name,
  book_name,
  return_date,
}) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div>
        <h1 className="text-3xl font-bold text-center mb-5">Add Orders</h1>
        <p className="text-center text-gray-500">
          Fill in the details to add a new order.
        </p>
        <p className="text-center text-gray-500">
          Please make sure the book is available in stock.
        </p>
        <p className="text-center text-gray-500">
          You can check the stock in the books section.
        </p>
      </div>
      <form
        onSubmit={handleOrderSubmit}
        className="max-w-sm mx-auto"
        style={{ marginTop: "2rem" }}
      >
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customer_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name of Customer"
            required
            value={customer_name}
            onChange={handleOrderChange}
            name="customer_name"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book Name
          </label>
          <input
            type="text"
            placeholder="Name of Book"
            id="book_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={book_name}
            onChange={handleOrderChange}
            name="book_name"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Return Date
          </label>
          <div classNameName="relative max-w-sm">
            <DatePicker
              id="datepicker-autohide"
              selected={return_date}
              onChange={(date) =>
                handleOrderChange({
                  target: { name: "return_date", value: date },
                })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              classNameName="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={handelOrderFormCancel}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOrder;
