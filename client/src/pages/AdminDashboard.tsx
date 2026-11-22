function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "Admin") {
    return (
      <section className="inner-page">
        <h1>Admin Dashboard</h1>
        <p>Admin access is required.</p>
      </section>
    );
  }

  return (
    <section className="inner-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.username || user.email}.</p>
    </section>
  );
}

export default AdminDashboard;