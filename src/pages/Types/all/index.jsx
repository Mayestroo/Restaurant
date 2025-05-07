import React, { useEffect, useState } from 'react';
import { getCategory } from '../categorycrud/index';
import { data, Link } from 'react-router-dom';

const Types = ({ setSelectedType }) => {
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem('access_token');
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Hammasi");

  useEffect(() => {
    getCategory(token, setDatas, setError);
  }, [token]);

 useEffect(() => {
  if (datas.length > 0) {
    const totalCount = datas.reduce((sum, item) => sum + item.count, 0);
    const hammasiCard = { name: "Hammasi", count: totalCount };
    setSelectedType(hammasiCard);
  }
}, [datas, setSelectedType]);

  const handleItemClick = (item) => {
    console.log('Type clicked:', item);
    setSelectedType(item);
    setSelectedItem(item.name);
  };

  const totalCount = datas.reduce((sum, item) => sum + item.count, 0);

  const hammasiCard = {
    name: "Hammasi",
    count: totalCount
  };

  const allCards = [hammasiCard, ...datas];

  return (
    <div className='flex flex-row gap-2'>
      {allCards.map((data, index) => (
        <Link
          onClick={() => handleItemClick(data)}
          key={index}
          className={`item w-[145px] h-auto rounded-2xl p-3 flex flex-col justify-between mb-4 ${selectedItem === data.name ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
            }`}
        >
          <div className="w-[35px] h-[35px] rounded-full" style={{
            backgroundColor: selectedItem === data.name ? "#3B82F6" : "#F7F7F7"
          }}></div>
          <div className="font-normal mt-4">{data?.name}</div>
          <p className="text-[#8F8F8F]">{data?.count} xil</p>
        </Link>
      ))}
    </div>
  );
};

export default Types;