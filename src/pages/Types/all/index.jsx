import React, { useEffect, useState } from 'react';
import { getCategory } from '../categorycrud/index';
import { Link } from 'react-router-dom';

const Types = ({ setSelectedType }) => {
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem('access_token');
  const [error, setError] = useState(null); 

  useEffect(() => {
    getCategory(token, setDatas, setError);
  }, [token]);

  const handleItemClick = (item) => {
    console.log('Type clicked:', item);
    setSelectedType(item); 
  };

  return (
    <div className='flex flex-row gap-2'>
      {datas.map((data, index) => (
        <Link
          onClick={() => handleItemClick(data)}
          key={index}
          className="item w-[145px] h-[140px] bg-white rounded-2xl p-3 flex flex-col justify-between mb-4"
        >
          <div className="w-[35px] h-[35px] bg-[#F7F7F7] rounded-full"></div>
          <div className="font-normal mt-4">{data?.name}</div>
          <p className="text-[#8F8F8F]">{data?.count} ta</p>
        </Link>
      ))}
    </div>
  );
};

export default Types;