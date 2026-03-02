import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

export default function History() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/api/files/history");
      setFiles(data);
    } catch (error) {
      console.error("Fetch history error");
    }
  };

  const deleteFile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?"))
      return;

    try {
      await API.delete(`/api/files/delete/${id}`);
      // await API.delete(`/api/files/${id}`);
      setFiles(files.filter((file) => file._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  const reAnalyze = async (id) => {
    try {
      const { data } = await API.get(`/api/files/reanalyze/${id}`);

      // Store parsed data temporarily
      localStorage.setItem("reanalyzeData", JSON.stringify(data.data));

      navigate("/dashboard");
    } catch (error) {
      alert("Re-analyze failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Upload History 📂
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        {files.length === 0 ? (
          <p className="text-gray-500">No uploads yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">File Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id} className="border-b hover:bg-gray-50">
                  
                  {/* 🔥 Click to Re-Analyze */}
                  <td className="py-2">
                    <button
                      onClick={() => reAnalyze(file._id)}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      {file.originalName}
                    </button>
                  </td>

                  <td>
                    {new Date(file.uploadedAt).toLocaleString()}
                  </td>

                  <td>
                    <button
                      onClick={() => deleteFile(file._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
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