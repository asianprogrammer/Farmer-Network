import TableView from "./TableView";

function TableViewPage() {
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