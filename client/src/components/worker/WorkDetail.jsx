import React from 'react'

const WorkDetail = () => {
    return (
        <div className='bg-white h-[300px] w-full grid place-items-center'>
            <div className='w-full px-4 py-6 max-w-[500px] border border-slate-400'>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold text-sm' htmlFor="responsible">Responsible</label>
                    <input className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm name' type="text" />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold text-sm' htmlFor="date">Date</label>
                    <input className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm name' type='date' />
                </div>
                <div className='flex flex-col mt-8'>
                    <button className='py-3 bg-black text-white font-bold rounded'>Pull change</button>
                </div>
            </div>
        </div>
    )
}

export default WorkDetail
