import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas/dist/html2canvas.esm.js";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalUploads: 0,
    latestUpload: null,
  });

  const chartRef = useRef();

  const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B"];

  // ======================
  // Fetch Stats
  // ======================
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/api/files/stats");
      setStats(data);
    } catch (error) {
      console.error("Stats error");
    }
  };

  // ======================
  // Auto Reanalyze
  // ======================
  useEffect(() => {
    const storedData = localStorage.getItem("reanalyzeData");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      setExcelData(parsed);

      if (parsed.length > 0) {
        const detectedColumns = Object.keys(parsed[0]);
        setColumns(detectedColumns);
        setXAxis(detectedColumns[0]);
        setYAxis(detectedColumns[1]);
      }

      localStorage.removeItem("reanalyzeData");
    }
  }, []);

  // ======================
  // Upload
  // ======================
  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const { data } = await API.post("/api/files/upload", formData);

      setExcelData(data.data);

      if (data.data.length > 0) {
        const detectedColumns = Object.keys(data.data[0]);
        setColumns(detectedColumns);
        setXAxis(detectedColumns[0]);
        setYAxis(detectedColumns[1]);
      }

      fetchStats();
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // Export PDF
  // ======================
  const exportPDF = async () => {
    const input = chartRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save("analytics-report.pdf");
  };

  const formattedData = excelData.map((item) => ({
    name: item[xAxis],
    value: Number(item[yAxis]) || 0,
  }));

  // return (
  //   <Layout>
  //     <h1 className="text-2xl font-bold mb-6">
  //       Advanced Excel Analytics 📊
  //     </h1>

  //     {/* SUMMARY CARDS */}
  //     <div className="grid md:grid-cols-4 gap-6 mb-6">
  //       <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow transition hover:scale-105">
  //         <h3>Total Uploads</h3>
  //         <p className="text-2xl font-bold mt-2">{stats.totalUploads}</p>
  //       </div>

  //       <div className="bg-pink-600 text-white p-6 rounded-2xl shadow transition hover:scale-105">
  //         <h3>Latest Upload</h3>
  //         <p className="text-sm mt-2">
  //           {stats.latestUpload
  //             ? new Date(stats.latestUpload).toLocaleDateString()
  //             : "N/A"}
  //         </p>
  //       </div>

  //       <div className="bg-green-600 text-white p-6 rounded-2xl shadow transition hover:scale-105">
  //         <h3>Total Rows</h3>
  //         <p className="text-2xl font-bold mt-2">{excelData.length}</p>
  //       </div>

  //       <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow transition hover:scale-105">
  //         <h3>Total Columns</h3>
  //         <p className="text-2xl font-bold mt-2">{columns.length}</p>
  //       </div>
  //     </div>

  //     {/* Upload */}
  //     <div className="bg-white p-6 rounded-2xl shadow mb-6">
  //       <input
  //         type="file"
  //         onChange={(e) => setFile(e.target.files[0])}
  //         className="border p-3 rounded-lg w-full"
  //       />

  //       <button
  //         onClick={handleUpload}
  //         disabled={loading}
  //         className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
  //       >
  //         {loading ? "Uploading..." : "Upload & Analyze"}
  //       </button>
  //     </div>

  //     {/* Column Selection */}
  //     {columns.length > 0 && (
  //       <div className="bg-white p-6 rounded-2xl shadow mb-6 grid md:grid-cols-3 gap-4">
  //         <div>
  //           <label className="text-sm font-semibold">Select X Axis</label>
  //           <select
  //             value={xAxis}
  //             onChange={(e) => setXAxis(e.target.value)}
  //             className="w-full mt-2 p-2 border rounded-lg"
  //           >
  //             {columns.map((col) => (
  //               <option key={col} value={col}>{col}</option>
  //             ))}
  //           </select>
  //         </div>

  //         <div>
  //           <label className="text-sm font-semibold">Select Y Axis</label>
  //           <select
  //             value={yAxis}
  //             onChange={(e) => setYAxis(e.target.value)}
  //             className="w-full mt-2 p-2 border rounded-lg"
  //           >
  //             {columns.map((col) => (
  //               <option key={col} value={col}>{col}</option>
  //             ))}
  //           </select>
  //         </div>

  //         <div>
  //           <label className="text-sm font-semibold">Chart Type</label>
  //           <select
  //             value={chartType}
  //             onChange={(e) => setChartType(e.target.value)}
  //             className="w-full mt-2 p-2 border rounded-lg"
  //           >
  //             <option value="bar">Bar Chart</option>
  //             <option value="line">Line Chart</option>
  //             <option value="pie">Pie Chart</option>
  //           </select>
  //         </div>
  //       </div>
  //     )}

  //     {/* Chart Section */}
  //     {formattedData.length > 0 && (
  //       <>
  //         <button
  //           onClick={exportPDF}
  //           className="mb-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
  //         >
  //           Export as PDF
  //         </button>

  //         <div ref={chartRef} className="bg-white p-6 rounded-2xl shadow">
  //           <ResponsiveContainer width="100%" height={400}>
  //             {chartType === "bar" && (
  //               <BarChart data={formattedData}>
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="name" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Legend />
  //                 <Bar dataKey="value" fill="#6366F1" />
  //               </BarChart>
  //             )}

  //             {chartType === "line" && (
  //               <LineChart data={formattedData}>
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="name" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Legend />
  //                 <Line type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={3} />
  //               </LineChart>
  //             )}

  //             {chartType === "pie" && (
  //               <PieChart>
  //                 <Tooltip />
  //                 <Legend />
  //                 <Pie
  //                   data={formattedData}
  //                   dataKey="value"
  //                   nameKey="name"
  //                   outerRadius={140}
  //                   label
  //                 >
  //                   {formattedData.map((entry, index) => (
  //                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
  //                   ))}
  //                 </Pie>
  //               </PieChart>
  //             )}
  //           </ResponsiveContainer>
  //         </div>
  //       </>
  //     )}
  //   </Layout>
  // );


  return (
  <Layout>
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white px-6 pb-10 overflow-x-hidden">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
        Advanced Excel Analytics 📊
      </h1>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Uploads", value: stats.totalUploads },
          {
            title: "Latest Upload",
            value: stats.latestUpload
              ? new Date(stats.latestUpload).toLocaleDateString()
              : "N/A",
          },
          { title: "Total Rows", value: excelData.length },
          { title: "Total Columns", value: columns.length },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-gray-300">{item.title}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ================= UPLOAD SECTION ================= */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg mb-8">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </div>

      {/* ================= COLUMN + CHART TYPE SECTION ================= */}
      {columns.length > 0 && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg mb-8 grid md:grid-cols-3 gap-6">

          <div>
            <label className="text-sm text-gray-300">Select X Axis</label>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-full mt-2 p-2 rounded-lg bg-white/20 border border-white/30"
            >
              {columns.map((col) => (
                <option key={col} value={col} className="text-black">
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Select Y Axis</label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full mt-2 p-2 rounded-lg bg-white/20 border border-white/30"
            >
              {columns.map((col) => (
                <option key={col} value={col} className="text-black">
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full mt-2 p-2 rounded-lg bg-white/20 border border-white/30"
            >
              <option value="bar" className="text-black">
                Bar Chart
              </option>
              <option value="line" className="text-black">
                Line Chart
              </option>
              <option value="pie" className="text-black">
                Pie Chart
              </option>
            </select>
          </div>
        </div>
      )}

      {/* ================= CHART SECTION ================= */}
      {formattedData.length > 0 && (
        <>
          <button
            onClick={exportPDF}
            className="mb-6 bg-black/70 px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            Export as PDF
          </button>

          <div
            ref={chartRef}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <ResponsiveContainer width="100%" height={400}>

              {chartType === "bar" && (
                <BarChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#6366F1" />
                </BarChart>
              )}

              {chartType === "line" && (
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EC4899"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {chartType === "pie" && (
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={140}
                    label
                  >
                    {formattedData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              )}

            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  </Layout>
);
  }