import React, { useState, useEffect, useMemo } from "react";
import Navbar from '../components/navbar'
export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [sortField, setSortField] = useState("first");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [genderFilter, setGenderFilter] = useState("All");

  useEffect(() => {
    // Dummy employee data with additional fields
    setEmployees([
      {
        id: "1",
        first: "Alice",
        last: "Wong",
        email: "alice@acme.com",
        phone: "555-1234",
        role: "Developer",
        dept: "Engineering",
        location: "San Francisco",
        hireDate: "2024-01-15",
        status: "Active",
        probationProgress: 80,
        gender: "Female",
        salary: 105000,
      },
      {
        id: "2",
        first: "Bob",
        last: "Smith",
        email: "bob@acme.com",
        phone: "555-5678",
        role: "Designer",
        dept: "Design",
        location: "New York",
        hireDate: "2023-03-10",
        status: "Probation",
        probationProgress: 55,
        gender: "Male",
        salary: 84000,
      },
      {
        id: "3",
        first: "Carol",
        last: "Lee",
        email: "carol@acme.com",
        phone: "555-8765",
        role: "HR Manager",
        dept: "Human Resources",
        location: "Austin",
        hireDate: "2020-06-20",
        status: "Active",
        probationProgress: 100,
        gender: "Female",
        salary: 98000,
      },
      {
        id: "4",
        first: "David",
        last: "Kim",
        email: "david@acme.com",
        phone: "555-4321",
        role: "Product Owner",
        dept: "Product",
        location: "Remote",
        hireDate: "2021-11-05",
        status: "Active",
        probationProgress: 100,
        gender: "Male",
        salary: 115000,
      },
      {
        id: "5",
        first: "Eva",
        last: "Chen",
        email: "eva@acme.com",
        phone: "555-2548",
        role: "QA Engineer",
        dept: "Engineering",
        location: "San Francisco",
        hireDate: "2024-05-01",
        status: "Probation",
        probationProgress: 30,
        gender: "Female",
        salary: 90000,
      },
    ]);
  }, []);

  // Departments and genders for filters
  const departments = ["All Departments", ...Array.from(new Set(employees.map(e => e.dept)))];
  const genders = ["All", "Male", "Female", "Other"];

  // Filter and sort employees
  const filteredSortedEmployees = useMemo(() => {
    let filtered = employees.filter(e => {
      const matchesSearch =
        (`${e.first} ${e.last}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = departmentFilter === "All Departments" || e.dept === departmentFilter;
      const matchesGender = genderFilter === "All" || e.gender === genderFilter;

      return matchesSearch && matchesDept && matchesGender;
    });

    filtered.sort((a, b) => {
      const aField = a[sortField]?.toString().toLowerCase() || "";
      const bField = b[sortField]?.toString().toLowerCase() || "";
      if (aField < bField) return sortDirection === "asc" ? -1 : 1;
      if (aField > bField) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [employees, searchTerm, departmentFilter, sortField, sortDirection, genderFilter]);

  // Metrics
  const totalEmployees = employees.length;
  const avgTenure = employees.length
    ? (
        employees.reduce((sum, e) => {
          const hireDate = new Date(e.hireDate);
          const now = new Date();
          return sum + (now - hireDate) / (1000 * 60 * 60 * 24 * 365);
        }, 0) / employees.length
      ).toFixed(1)
    : 0;

  const genderCounts = employees.reduce((acc, e) => {
    acc[e.gender] = (acc[e.gender] || 0) + 1;
    return acc;
  }, {});

  // Handlers
  const startEditing = emp => {
    setEditForm({ ...emp });
    setEditingEmployee(emp.id);
  };

  const cancelEditing = () => {
    setEditingEmployee(null);
  };

  const saveEditing = () => {
    setEmployees(prev => prev.map(emp => (emp.id === editingEmployee ? { ...editForm } : emp)));
    setEditingEmployee(null);
  };

  const deleteEmployee = id => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      if (editingEmployee === id) setEditingEmployee(null);
    }
  };

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleSort = field => {
    if (sortField === field) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div style={styles.container}>
      <>    <Navbar /></>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Employee Management</h1>
        <button style={styles.addBtn} onClick={() => alert("Add Employee placeholder")}>
          + Add Employee
        </button>
      </header>

      {/* Metrics Cards */}
      <section style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <h2 style={styles.metricValue}>{totalEmployees}</h2>
          <p>Total Employees</p>
        </div>
        <div style={styles.metricCard}>
          <h2 style={styles.metricValue}>{avgTenure} yrs</h2>
          <p>Average Tenure</p>
        </div>
        <div style={styles.metricCard}>
          <h2 style={styles.metricValue}>{genderCounts["Male"] || 0}</h2>
          <p>Male Employees</p>
        </div>
        <div style={styles.metricCard}>
          <h2 style={styles.metricValue}>{genderCounts["Female"] || 0}</h2>
          <p>Female Employees</p>
        </div>
      </section>

      {/* Controls */}
      <div style={styles.controlsContainer}>
        <input
          type="search"
          placeholder="Search by name, email, role, dept, location..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
          style={styles.select}
        >
          {departments.map((dep, i) => (
            <option key={i} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        <select
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
          style={styles.select}
        >
          {genders.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.clickableHeader} onClick={() => toggleSort("first")}>
              First Name {sortField === "first" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.clickableHeader} onClick={() => toggleSort("last")}>
              Last Name {sortField === "last" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Email</th>
            <th>Phone</th>
            <th style={styles.clickableHeader} onClick={() => toggleSort("role")}>
              Role {sortField === "role" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.clickableHeader} onClick={() => toggleSort("dept")}>
              Department {sortField === "dept" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Location</th>
            <th>Status</th>
            <th>Hire Date</th>
            <th>Probation</th>
            <th>Salary ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedEmployees.length === 0 ? (
            <tr>
              <td colSpan="12" style={styles.noData}>
                No employees found
              </td>
            </tr>
          ) : (
            filteredSortedEmployees.map(e => (
              <tr key={e.id}>
                {editingEmployee === e.id ? (
                  <>
                    <td>
                      <input
                        name="first"
                        value={editForm.first}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="last"
                        value={editForm.last}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="role"
                        value={editForm.role}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="dept"
                        value={editForm.dept}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="location"
                        value={editForm.location}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="status"
                        value={editForm.status}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <input
                        name="hireDate"
                        type="date"
                        value={editForm.hireDate}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <progress max="100" value={editForm.probationProgress || 0} style={{ width: "100%" }} />
                      <small>{editForm.probationProgress || 0}%</small>
                    </td>
                    <td>
                      <input
                        name="salary"
                        type="number"
                        value={editForm.salary}
                        onChange={handleEditInputChange}
                        style={styles.inlineInput}
                      />
                    </td>
                    <td>
                      <button style={styles.saveBtn} onClick={saveEditing}>
                        Save
                      </button>
                      <button style={styles.cancelBtn} onClick={cancelEditing}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{e.first}</td>
                    <td>{e.last}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.role}</td>
                    <td>{e.dept}</td>
                    <td>{e.location}</td>
                    <td>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            e.status === "Active" ? "#10b981" : e.status === "Probation" ? "#f59e0b" : "#ef4444",
                        }}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td>{new Date(e.hireDate).toLocaleDateString()}</td>
                    <td>
                      <progress max="100" value={e.probationProgress || 0} style={{ width: "100%" }} />
                      <small>{e.probationProgress || 0}%</small>
                    </td>
                    <td>{e.salary.toLocaleString()}</td>
                    <td>
                      <button style={styles.viewBtn} onClick={() => alert(`Viewing ${e.first} ${e.last}`)}>
                        View
                      </button>
                      <button style={styles.editBtn} onClick={() => startEditing(e)}>
                        Edit
                      </button>
                      <button style={styles.deleteBtn} onClick={() => deleteEmployee(e.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: 32,
    maxWidth: 1200,
    margin: "auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#1e293b",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  title: { fontSize: 32, fontWeight: "700" },
  addBtn: {
    backgroundColor: "#10b981",
    color: "white",
    borderRadius: 8,
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  metricsGrid: { display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" },
  metricCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 15px rgba(0,0,0,0.05)",
    flex: "1 1 180px",
    textAlign: "center",
  },
  metricValue: { fontSize: 32, fontWeight: "700", marginBottom: 4 },
  metricLabel: { color: "#64748b" },
  controlsContainer: { display: "flex", gap: 12, marginBottom: 16 },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  select: {
    width: 200,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 0 15px rgba(0,0,0,0.05)",
    borderRadius: 12,
    overflow: "hidden",
  },
  clickableHeader: { cursor: "pointer", userSelect: "none", color: "#475569" },
  noData: { padding: 24, textAlign: "center", color: "#64748b", fontStyle: "italic" },
  inlineInput: {
    width: "100%",
    padding: 6,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #cbd5e1",
  },
  statusBadge: {
    color: "white",
    borderRadius: 6,
    padding: "3px 10px",
    fontWeight: "600",
    fontSize: 12,
    display: "inline-block",
  },
  viewBtn: {
    backgroundColor: "#3b82f6",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    marginRight: 8,
    fontWeight: "600",
  },
  editBtn: {
    backgroundColor: "#fbbf24",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    marginRight: 8,
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: "#10b981",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    marginRight: 8,
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#94a3b8",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};
