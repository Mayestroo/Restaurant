import React, { useState } from "react";

const Account = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userData = {
        tableNumber: 12, 
    };

    return (
        <div className="relative">
            <button
                className="user-account w-[50px] h-[50px] bg-white flex justify-center items-center rounded-full p-1 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="fa-solid fa-circle-user text-[37px] text-green-400"></i>
            </button>

            {isOpen && (
                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md p-4 w-48 z-[100]">
                    <h2 className="text-lg font-semibold">Account Info</h2>
                    <p className="mt-2">Table Number: {userData.tableNumber}</p>
                </div>
            )}
        </div>
    );
};

export default Account;