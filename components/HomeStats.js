import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { subHours } from "date-fns";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    return new Intl.NumberFormat("en-US").format(sum).slice(0,-4);
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24),
  );
  const ordersThisWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7),
  );
  const ordersThisMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30),
  );
  return (
    <div>
      <h2>Orders</h2>
      <div className="tile-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersToday.length}</div>
          <div className="tile-desc">orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>
          <div className="tile-number">{ordersThisWeek.length}</div>
          <div className="tile-desc">orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>
          <div className="tile-number">{ordersThisMonth.length}</div>
          <div className="tile-desc">orders this month</div>
        </div>
      </div>
      <h2>Revenue</h2>
      <div className="tile-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">₹{ordersTotal(ordersToday) || '0'}k</div>
          <div className="tile-desc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>
          <div className="tile-number">₹{ordersTotal(ordersThisWeek)}k</div>
          <div className="tile-desc">
            {ordersThisWeek.length} orders this week
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>
          <div className="tile-number">₹{ordersTotal(ordersThisMonth)}k</div>
          <div className="tile-desc">
            {ordersThisMonth.length} orders this month
          </div>
        </div>
      </div>
    </div>
  );
}
