import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { deleteUser, getUsers } from "../services/profileService";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    return getUsers().then(res => setUsers(res.data)).catch(err => toast.error(err.response.data.message))
  };
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      return deleteUser(id).then(res => {
        console.log(res.data,'users');
        getUsers().then(res => setUsers(res.data)).catch(err => toast.error(err.response.data.message));
        toast.success('User Deleted');
      });
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-zinc-600 font-bold ">Users</h1>
      <Table users={users} handleDelete={handleDelete} />
    </div>
  );
};

export default Users;
