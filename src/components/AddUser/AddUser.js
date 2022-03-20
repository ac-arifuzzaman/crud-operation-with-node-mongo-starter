import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const eamilRef = useRef();

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = eamilRef.current.value;
    const newUser = { email, name };

    fetch("http://localhost:3030/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully added the user");
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} />
        <input type="email" name="" id="" ref={eamilRef} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddUser;
