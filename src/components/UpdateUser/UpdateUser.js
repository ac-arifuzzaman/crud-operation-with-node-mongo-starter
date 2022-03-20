import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:3030/users/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  const handleUpdateName = (e) => {
    const editeduser = e.target.value;
    const updateduser = { name: editeduser, email: user.email };
    setUser(updateduser);
  };

  const handleUpdateEmail = (e) => {
    const editedEmail = e.target.value;
    // const updatedEmail = {...user};
    // updatedEmail.user = editedEmail
    const updatedEmail = { name: user.name, email: editedEmail };
    setUser(updatedEmail);
  };

  const handleUpdateuser = (e) => {
    const url = `http://localhost:3030/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Update successfully");
          setUser({});
        }
      });
    e.preventDefault();
  };

  return (
    <div>
      <h2>
        This is {user.name} :: {user.email}
      </h2>
      <p>
        <small>{id}</small>
      </p>
      <form onSubmit={handleUpdateuser}>
        <input
          type="text"
          onChange={handleUpdateName}
          value={user.name || ""}
        />
        <input
          type="email"
          onChange={handleUpdateEmail}
          name=""
          id=""
          value={user.email || ""}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
