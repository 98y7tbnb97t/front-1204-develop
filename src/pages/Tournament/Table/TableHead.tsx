import sort from '../../../assets/sort.png'

const TableHead = ({ columns }:any) => {

    return (
     <thead> 
      <tr className='bg-[#dddddd] h-[50px] text-blue-600'>
       {columns.map(({ Header, accessor }:any) => {
        return <><th className="border border-gray-300 " key={accessor}>{Header} {(accessor == 'date_of_birth' || accessor == 'male') && <img src={sort} className='h-[20px] inline-block' /> }</th></>;
       })}
      </tr>
     </thead>
    );
   };
   
   export default TableHead;