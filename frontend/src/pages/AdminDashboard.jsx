import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/api/users/all-users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      await API.delete(`/api/users/delete-user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Admin User Management 👥
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Uploaded Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fileCount}</td>
                  <td>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}