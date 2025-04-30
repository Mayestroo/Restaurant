import React from 'react'
import five from '../../../images/five.avif'
import date from '../../../images/date.svg'
import bell from '../../../images/bell.svg'

const Navbar = () => {
    const days = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan']
    const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ]
    const today = new Date()

    return (
        <section className='navbar flex flex-col gap-3 items-center min-[735px]:flex-row flex-wrap md:flex-row md:justify-between'>
            <div className="logo flex flex-row items-center gap-2">
                <img
                    src={five}
                    alt="greeting image"
                    className='greeting-img w-[40px] h-[40px] xl:w-[60px] xl:h-[60px] rounded-full border-3 md:border-4 border-white' />

                <h2 className='nav-text font-medium text-xl xl:text-[28px]'>Assalamu alaykum!</h2>
            </div>

            <div className="date w-[220px] xl:w-auto p-2 xl:px-3 bg-white rounded-full flex flex-row items-center gap-5 sm:mr-2">
                <span className='w-[34px] h-[34px] xl:w-[46px] xl:h-[46px] rounded-full bg-[#EFF6FF] text-[#2C72FE] flex flex-row items-center justify-center'>
                    <img
                        className='w-[20px] h-[20px] xl:w-[30px] xl:h-[30px]'
                        src={date}
                        alt="date image" />
                </span>

                <span className='flex flex-row gap-1 font-normal text-base xl:text-xl'>
                    <p>{days[today.getDay()]},</p>
                    <p>{today.getDate()} {months[today.getMonth()]}</p>
                    <p>{today.getFullYear()}</p>
                </span>
            </div>

            <button className="waiter w-[220px] xl:w-auto xl:px-3 p-2 bg-white rounded-full flex flex-row items-center gap-5 cursor-pointer">
                <span className='w-[34px] h-[34px] xl:w-[46px] xl:h-[46px] rounded-full bg-[#FFDFDF] text-[#FF2B2B] flex flex-row items-center justify-center'>
                    <img
                        className='w-[20px] h-[20px] xl:w-[30px] xl:h-[30px]'
                        src={bell}
                        alt="bell image" />
                </span>

                <span className='waiter-text text-base xl:text-xl'>
                    <p>Ofitsant chaqirish</p>
                </span>
            </button>
        </section>
    )
}

export default Navbar