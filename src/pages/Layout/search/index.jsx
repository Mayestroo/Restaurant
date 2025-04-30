import React from 'react'

const Search = () => {
  return (
    <section className='relative max-w-[905px] w-full'>
      <input
        placeholder='Xayolingizdagi eng shirin lazzatni bu yerdan izlang...'
        className='search md:max-w-[905px] w-full bg-white rounded-full m-auto outline-none py-[10px] md:py-[18px] pl-5 pr-2 text-base placeholder:opacity-0 min-[480px]:placeholder:opacity-100 md:text-[18px]' />
      <div className='search-icon absolute right-1 bottom-1 md:right-2 md:bottom-2 w-[35px] h-[35px] md:w-[46px] md:h-[46px] bg-[#EFF6FF] rounded-full flex items-center justify-center'>
        <i className="fa-solid fa-magnifying-glass text-base xl:text-2xl"></i>
      </div>
    </section>
  )
}

export default Search