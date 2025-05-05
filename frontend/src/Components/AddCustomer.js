import React from "react";

function AddCustomer({
  handleCustomerChange,
  handleCustomerSubmit,
  handleCustomerCancel,
  customer_name,
  phone_number,
}) {
  return (
    <div>
      <div style={{marginTop: "1.5rem"}}>
        <h1 className="text-3xl font-bold text-center mb-5">Add Customer</h1>
        <p className="text-center text-gray-500">
          Fill in the details to add a new customer.
        </p>
        <p className="text-center text-gray-500">
          Please make sure the phone number is correct. The Phone number is only
          10 digits
        </p>
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          Please make sure the customer is not already registered.
        </p>
      </div>
      <form style={{marginTop: "2rem"}} onSubmit={handleCustomerSubmit} className="max-w-sm mx-auto">
        <div className="gap-6 mb-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              value={customer_name}
              name="customer_name"
              onChange={handleCustomerChange}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0717029229"
              value={phone_number}
              name="phone_number"
              onChange={handleCustomerChange}
              required
            />
          </div>
        </div>
        <div className="grid gap-4 mb-2 md:grid-cols-2">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="cancel"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleCustomerCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
