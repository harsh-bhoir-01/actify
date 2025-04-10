// App.jsx
import React from "react";
import Table from "./components/Table";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <div className=" min-w-min h-full  ">
      <h1 className=" text-center font-serif my-3 text-4xl font-bold">
        User Table
      </h1>
      <div>
        <UserForm />
        <Table />
      </div>
    </div>
  );
};

export default App;
