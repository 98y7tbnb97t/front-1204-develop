const TableBody = ({ tableData, columns }: any) => {
  function setWidht(accessor: string) {
    switch (accessor) {
      case 'number':
        return 'w-[40px] text-red-600';
      case 'name':
        return 'w-[220px]';
      case 'group':
        return 'w-[220px]';
      case 'date_of_birth':
        return 'w-[220px]';
      case 'male':
        return 'w-[100px]';
      case 'rank':
        return 'w-[60px]';
      case 'traner':
        return 'w-[220px]';
      case 'score':
        return 'w-[20px] font-bold';
        case 'datae':
          return 'w-[20px] font-bold';
      default:
        break;
    }
  }
  return (
    <tbody>
      {tableData.map((data: any) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }: any) => {
              const tData = data[accessor] ? data[accessor] : '——';
              console.log(accessor);
              return (
                <td
                  className={`border border-gray-400  text-center ${setWidht(
                    accessor,
                  )}`}
                  key={accessor}
                >
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
