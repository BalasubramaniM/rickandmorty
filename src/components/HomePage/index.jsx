import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    console.log("Home Page");
  }, []);

  return <p>Home Page</p>;
};

export default Dashboard;

