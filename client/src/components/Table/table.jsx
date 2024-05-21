const Table = ({ headers, data }) => {
  if (!data) data = [];
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          {headers.map((header, i) => (
            <th
              key={i}
              className="px-4 py-4 font-medium text-black dark:text-white"
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item, i, arr) => (
            <tr key={i}>
              {headers.map((header, j) => (
                <td
                  key={i + "-" + j}
                  className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                >
                  {header.cb ? (
                    header.cb(item, i, arr)
                  ) : header.key ? (
                    <p className="text-black dark:text-white">
                      {item[header.key]}
                    </p>
                  ) : (
                    <></>
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center py-5 dark:text-white"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;
