import "@/assets/styles/TableView.css";

/**
 * TableView
 * @param {string}   [title]         Optional section title shown above the table
 * @param {Array}    columns         [{ key, header, className?, render?(row) }]
 * @param {Array}    rows            Array of row objects
 * @param {string}   [ariaLabel]     Accessible label for the scroll region
 * @param {string}   [className]     Extra class for the outer section
 */
export default function TableView({
  title,
  columns = [],
  rows = [],
  ariaLabel,
  className = "",
}) {
  return (
    <section className={`tv card ${className}`}>
      {title && (
        <div className="card__header">
          <h2 className="card__title">{title}</h2>
        </div>
      )}

      <div className="card__body">
        <div
          className="table-wrap"
          role="region"
          aria-label={ariaLabel || title || "data table"}
        >
          <table className="table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={col.className || ""} scope="col">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="table__row">
                  {columns.map((col) => (
                    <td key={col.key} className={col.className || ""}>
                      {col.render ? col.render(row, rIdx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td className="table__empty" colSpan={columns.length}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
