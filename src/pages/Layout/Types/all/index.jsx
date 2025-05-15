import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getCategory } from "../categorycrud/index";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Types = ({ setSelectedType }) => {
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem("access_token");
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
    console.log("Type clicked:", item);
    setSelectedType(item);
    setSelectedItem(item.name);
  };

  const totalCount = datas.reduce((sum, item) => sum + item.count, 0);
  const hammasiCard = { name: "Hammasi", count: totalCount };
  const allCards = [hammasiCard, ...datas];

  const settings = {
    infinite: false,
    swipeToSlide: true,
    draggable: true,
    accessibility: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    lazyLoad: true
  };

  return (
    <div className="w-full">
      <Slider {...settings} className="overflow-hidden">
        {allCards.map((data, index) => (
          <div key={index}>
            <Link
              onClick={() => handleItemClick(data)}
              className={`item w-[145px] h-auto rounded-2xl p-3 flex flex-col justify-between ${selectedItem === data.name ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
                }`}
            >
              <div
                className="w-[35px] h-[35px] rounded-full"
                style={{
                  backgroundColor: selectedItem === data.name ? "#3B82F6" : "#F7F7F7",
                }}
              ></div>
              <div className="font-normal mt-4">{data?.name}</div>
              <p className="text-[#8F8F8F]">{data?.count} xil</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Types;