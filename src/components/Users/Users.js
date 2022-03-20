import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteId = (id) => {
    const proceed = window.confirm("Are you sure you want to delete");
    if (proceed) {
      const url = `http://localhost:3030/users/${id}`;
      fetch(url, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted successfully");
            const remainingUser = users.filter((user) => user._id !== id);
            setUsers(remainingUser);
          }
        });
    }
  };

  return (
    <div>
      <h4>Our users: {users.length}</h4>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} :: {user.email}
            <Link to={`/users/update/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDeleteId(user._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
