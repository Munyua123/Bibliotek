import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const totalOrders = orders.length;
  const returnedOrders = orders.filter((o) => o.returned).length;
  const activeOrders = orders.filter((o) => !o.returned).length;

  const overdueOrders = orders.filter((o) => {
    const today = new Date();
    const returnDate = new Date(o.return_date);
    return !o.returned && returnDate < today;
  }).length;

  const totalRent = orders.reduce((sum, o) => sum + Number(o.rent_fee || 0), 0);

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              📊 BIBLIOTEK DASHBOARD
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <StatCard title="Total Orders" value={totalOrders} />
                <StatCard title="Returned Orders" value={returnedOrders} />
                <StatCard title="Active Orders" value={activeOrders} />
                <StatCard title="Overdue Orders" value={overdueOrders} />
                <StatCard
                  title="Total Rent Fee Collected"
                  value={`KES ${totalRent}`}
                />
              </div>

              {/* Alerts */}
              {overdueOrders > 0 && (
                <div className="bg-red-100 text-red-800 p-3 rounded mb-6">
                  ⚠️ {overdueOrders} orders are overdue. Please follow up.
                </div>
              )}

              {/* Recent Orders Table */}
              <div className="bg-grey shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">🕑 Recent Orders</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Book
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Issued
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Returned
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">ORD: {order.order_number}</td>
                        <td className="px-6 py-4">{order.customer_name}</td>
                        <td className="px-6 py-4">{order.book_name}</td>
                        <td className="px-6 py-4">
                          {formatDate(order.date_issued)}
                        </td>
                        <td className="px-6 py-4">
                          {order.returned ? (
                            <span className="text-green-600 font-medium">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <Link to="/orders" className="text-blue-600 hover:underline">
                    View All Orders →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
export default Home;
