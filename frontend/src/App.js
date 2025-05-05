import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Books from "./Components/Books";
import Customer from "./Components/Customers";
import Orders from "./Components/Orders";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/orders" element={<Orders />} />
       </Routes>
    </div>  
  );
}

export default App;
