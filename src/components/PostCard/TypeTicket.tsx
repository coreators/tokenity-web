import React, { useContext, useState } from "react";
import { PriceContext } from "../../context/PriceContext";
import TypePost from "./TypePost";

function TypeTicket({ post }) {
  const { cosm } = useContext(PriceContext);
  const [amount, setAmount] = useState("");
  const [usd, setUsd] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setUsd(`${(e.target.value * cosm).toFixed(2)}`);
  };

  return (
    <div>
      <div className="p-3">
        <span className="category">
          Ticket <i className="fas fa-ticket"></i>
        </span>
        <h4 className="my-3">{post.postExtra ? post.postExtra.title : ""}</h4>
      </div>
      {post.postContent.length > 0 && (
        <div>
          <hr />
          <TypePost post={post} />
        </div>
      )}
      <hr />
      {/* price */}
      <div className="p-3">
        <div className="d-flex flex-column flex-sm-row"> 
          <div className="me-0 me-sm-2 mb-1">
            <div className="input-group ">
              <span className="input-group-text">COSM</span>
              <input
                type="text"
                value={amount}
                aria-describedby="text"
                onKeyPress={(e) => {
                  return !/[0-9.]/.test(e.key) && e.preventDefault();
                }}
                onChange={handleAmountChange}
                className="form-control text-end"
              />
            </div>
          </div>
          <div className="me-0 me-sm-2 mb-1">
            <div className="input-group ">
              <span className="input-group-text">USD</span>
              <input
                value={usd.toLocaleString()}
                className="form-control text-end"
                readOnly
              />
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary text-nowrap">Buy NFT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypeTicket;
