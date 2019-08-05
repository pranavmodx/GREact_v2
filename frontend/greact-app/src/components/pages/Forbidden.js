import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div>
      <h1 className="display-4">
        <span className="text-danger ">403</span> Page Forbidden
      </h1>
      <p className="lead">Please login to access that page.</p>
      <h3>
        <Link className="nav-link text-primary" to="/login">
          Login Now
        </Link>
      </h3>
    </div>
  );
}
