import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditOrders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    book_name: "",
    rent_fee: "",
    return_date: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => {
        setFormData({
          customer_name: data.customer.customer_name || "",
          book_name: data.book.book_name || "",
          rent_fee: data.rent_fee || "",
          returned: data.returned || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update order");
        return res.json();
      })
      .then(() => {
        alert("Order updated successfully!");
        navigate("/orders"); // redirect back to orders list
      })
      .catch((err) => {
        alert("Error updating order: " + err.message);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
            fill="currentColor"
          />
          <path
            d="M93.9717 39.4279C88.8395 29.6794 80.3502 22.0001 70.0001 17.9999C66.3333 16.6666 62.6667 15.9999 59 15.9999V0C63.3333 0 67.6667 0.333333 71.9999 1C85.3332 3.00001 96.3332 10.3333 103 20C109.667 29.6677 113.333 41.6674 113.333 50C113.333 54.6671 112.667 59.3341 111.333 63"
            stroke="currentFill"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  // Handle Error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  function handleEditOrderCancel(e) {
    e.preventDefault();
    navigate("/orders");
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
        className="max-w-sm mx-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Orders
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="editUserModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only" onClick={handleEditOrderCancel}>
                Close modal
              </span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="customer_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customer_name"
                  onChange={handleChange}
                  name="customer_name"
                  value={formData.customer_name}
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Bonnie"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="book_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Book Name
                </label>
                <input
                  type="text"
                  id="book_name"
                  onChange={handleChange}
                  value={formData.book_name}
                  name="book_name"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Green"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="rent_fee"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rent Fee
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={formData.rent_fee}
                  name="rent_fee"
                  id="rent_fee"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="returned"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Returned
                </label>
                <select
                  value={formData.returned}
                  onChange={handleChange}
                  name="returned"
                  id="returned"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Select Genre" disabled />
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrders;
