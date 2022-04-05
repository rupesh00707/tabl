/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./css/App.css";
import { MdOutlineClose, MdSearch } from "react-icons/md";
import { BiSortDown } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [sort, setSort] = useState("");
  const tableHeading = [
    { name: "Order ID", sort: "order_id" },
    { name: "Customer", sort: "customer" },
    { name: "Address", sort: "address" },
    { name: "Product", sort: "product_title" },
    { name: "Date Ordered", sort: "date" },
    { name: "Status", sort: "status" },
  ];
  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/Ved-X/assignment/orders")
      .then((res) => {
        setData(res.data);
        setOrderData(res.data);
      })
      .catch(() => {
        alert("Error in fetching data");
      });
  }, []);

  useEffect(() => {
    console.log(sort);
    if(sort === "order_id"){
      const sortArray = orderData.sort(function (a, b) {
        if (a.order_id < b.order_id) {
          return -1;  
        }
        if (a.order_id > b.order_id) {
          return 1;
        }
        return 0;
      });

      setData([...sortArray, { name: "rupe " }]);
    }
    if (sort == "customer") {
      const sortArray = orderData.sort(function (a, b) {
        if (a.customer < b.customer) {
          return -1;
        }
        if (a.customer > b.customer) {
          return 1;
        }
        return 0;
      });

      setData([...sortArray, { name: "rupe " }]);
    }
    if (sort == "address") {
      const sortArray = orderData.sort(function (a, b) {
        if (a.address < b.address) {
          return -1;
        }
        if (a.address > b.address) {
          return 1;
        }
        return 0;
      });
      setData([...sortArray, { name: "rupe " }]);
    }
    if (sort == "product_title") {
      const sortArray = orderData.sort(function (a, b) {
        if (a.product_title < b.product_title) {
          return -1;
        }
        if (a.product_title > b.product_title) {
          return 1;
        }
        return 0;
      });
      setData([...sortArray, { name: "rupe " }]);
    }
  }, [sort]);
  const handleSearch = () => {
    if (search.length > 0) {
      const filteredArray = data.filter((item) =>
        item.customer.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredArray);
    } else {
      setData(orderData);
    }
  };

  return (
    <div className="dashBoardContainer">
      <div className="table-nav-bar">
        <div className="nav-tab-container">
          <h2>All Order</h2>
        </div>
        <div className="result-number-container ">
          <h3 className="gray-text">
            {" "}
            {`Showing ${orderData.length} of ${orderData.length} results`}
          </h3>
        </div>
      </div>
      <div className="table-container">
        <div className="table-header">
          <div className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
              onKeyDown={(e) => {
                console.log("e", e.key);
                if (e.key === "Backspace") {
                  handleSearch();
                }
              }}
            />

            <MdOutlineClose
              className="search-clear"
              onClick={() => {
                setSearch("");
                setData(orderData);
              }}
            />
          </div>
          <div
            className="filter-container"
            onClick={() => {
              console.log("filter");
            }}
          >
            <BiSortDown className="search-filter" />
            <h4>Filter</h4>
          </div>
        </div>
        <div className="table-body">
          {tableHeading.map((heading, index) => {
            return (
              <div className="heading-container">
                <h4>{heading.name}</h4>
                <AiOutlineDown
                  className="arrow-down"
                  onClick={() => {
                    setSort(heading.sort);
                  }}
                />
              </div>
            );
          })}
          {data.map((item, index) => {
            return (
              <div className="table-row">
                <h5>{item.order_id}</h5>
                <h5>{item.customer}</h5>

                <h5 className="gray-text">
                  {item.country} <br />{" "}
                  <span className="gray-sub-text">{item.address}</span>
                </h5>
                <h5 className="gray-text">
                  {item.product_title} <br />{" "}
                  <span className="gray-sub-text">{item.product_description}</span>
                </h5>
                <h5 className="gray-text">{item.date}</h5>
                <div className={`status-container-${item.status}`}>
                  <h5 className={`status-text-${item.status}`}>{item.status}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
