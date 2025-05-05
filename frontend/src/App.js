import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Books from "./Components/Books";
import Customer from "./Components/Customers";
import Orders from "./Components/Orders";
import AddCustomer from "./Components/AddCustomer";
import AddBooks from "./Components/AddBooks";
import AddOrder from "./Components/AddOrders";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import EditOrders from "./Components/EditOrders";

function App() {
  const navigate = useNavigate();

  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    phone_number: "",
  });

  const [newBook, setNewBook] = useState({
    book_name: "",
    book_author: "",
    book_price: "",
    book_stock: "",
    book_genre: "",
  });

  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    book_name: "",
    return_date: "",
  });

  const [orderList, setOrderList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [bookList, setBookList] = useState([]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  function handleCustomerSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/customers");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleBookSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleOrderSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleOrderDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOrderList(orderList.filter((order) => order.id !== id));
      } else {
        console.error("Failed to delete order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomerDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCustomerList(customerList.filter((customer) => customer.id !== id));
      } else {
        console.error("Failed to delete customer");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleBookDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBookList(bookList.filter((book) => book.id !== id));
      } else {
        console.error("Failed to delete book");
      }
    } catch (err) {
      console.error(err);
    }
  };

  function handleBookCancel(e) {
    e.preventDefault();
    navigate("/books");
  }

  function handleCustomerCancel(e) {
    e.preventDefault();
    navigate("/customers");
  }

  function handleOrderFormCancel(e) {
    e.preventDefault();
    navigate("/customers");
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books"
          element={<Books handleBookDelete={handleBookDelete} />}
        />
        <Route
          path="/add_books"
          element={
            <AddBooks
              handleBookCancel={handleBookCancel}
              handleBookChange={handleBookChange}
              handleBookSubmit={handleBookSubmit}
              book_author={newBook.book_author}
              book_name={newBook.book_name}
              book_price={newBook.book_price}
              book_stock={newBook.book_stock}
              book_genre={newBook.book_genre}
            />
          }
        />
        <Route
          path="/customers"
          element={<Customer handleCustomerDelete={handleCustomerDelete} />}
        />
        <Route
          path="/add_customer"
          element={
            <AddCustomer
              handleCustomerCancel={handleCustomerCancel}
              handleCustomerChange={handleCustomerChange}
              handleCustomerSubmit={handleCustomerSubmit}
              phone_number={newCustomer.phone_number}
              customer_name={newCustomer.customer_name}
            />
          }
        />
        <Route
          path="/orders"
          element={<Orders handleOrderDelete={handleOrderDelete} />}
        />
        <Route
          path="/add_orders"
          element={
            <AddOrder
              handleOrderChange={handleOrderChange}
              handleOrderSubmit={handleOrderSubmit}
              handleOrderFormCancel={handleOrderFormCancel}
              customer_name={newOrder.customer_name}
              book_name={newOrder.book_name}
              return_date={newOrder.return_date}
            />
          }
        />
        <Route path="/order/:id" element={<EditOrders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
