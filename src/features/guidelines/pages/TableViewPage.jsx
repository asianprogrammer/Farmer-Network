import TableView from "./TableView";

function TableViewPage() {
  const columns = [
    { key: "id", header: "ID", className: "col-id" },
    { key: "name", header: "Name", className: "col-name" },
    { key: "email", header: "Email", className: "col-email" },
    {
      key: "status",
      header: "Status",
      className: "col-status",
      render: (row) => (
        <span className={`status ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "Active",
    },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      status: "Pending",
    },
    { id: 4, name: "Dana White", email: "dana@example.com", status: "Active" },
  ];

  return (
    <>
      <TableView
        title="User List"
        columns={columns}
        rows={rows}
        ariaLabel="User data table"
      />
    </>
  );
}
