import React, { useEffect, useRef, useState } from 'react'
import plus from '../assets/img/dashboard/Group.png'
import trash from '../assets/img/dashboard/trash.png'
import danger from '../assets/img/dashboard/danger.png'
import information from '../assets/img/dashboard/information.png'
import empty from '../assets/img/dashboard/empty.png'
import axios from 'axios'
import { format } from 'date-fns';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import te from 'tw-elements';

function Dashboard() {
    const [listActivity,setListActivity] = useState([]);
    const [activity,setActivity] = useState();
    const [loading,setLoading] = useState(true);

    const CloseRef = useRef();
    const BerhasilRef = useRef();
    let navigate = useNavigate();

    const fetchActivity = () =>
    {
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups?email=samuelstev0902@Gmail.com`).then(res=>{
            // console.log(res);
            setListActivity(res.data.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchActivity()
    }, [])
    

    const handleTambah = () =>{
        const data ={
            email : "samuelstev0902@Gmail.com",
            title : "New Activity"
        }
        axios.post("https://todo.api.devcode.gethired.id/activity-groups/",data).then(res=>{
            fetchActivity()      
        })
        console.log(listActivity);
    }
    // console.log(listActivity.length);

    const handleDelete = (e,id) =>
    {
        e.preventDefault();
        axios.delete("https://todo.api.devcode.gethired.id/activity-groups/"+id).then(res=>{
            CloseRef.current.click();
            BerhasilRef.current.click();
            fetchActivity()
        })
    }    

    const handleClick = (id) =>{
        // console.log(id);
        navigate("/detail/"+id);
    }

    const handleKonfirmasi = (e,item) =>{
        setActivity(item)
        // console.log(item);
    }


  return (
    <>
        <div className='min-h-screen bg-[#F4F4F4]'>
            <div className='bg-[#16ABF8]'  data-cy="header-background">
                <div className='!max-w-[1000px] container mx-auto flex '>
                    <p className='text-white font-poppins mt-[38px] mb-[31px]  font-[700] leading-[36px] text-[24px]'  data-cy="header-title">TO DO LIST APP</p>
                </div>
            </div>
            <div className='!max-w-[1000px] container mx-auto '>
                <div className='flex justify-between my-12'>
                    <p className='font-poppins font-[700] text-4xl leading-[54px]' data-cy="activity-title">Activity</p>
                    <button data-cy="activity-add-button" type='submit' className='bg-[#16ABF8] flex items-center px-4 py-2 rounded-full text-white' onClick={handleTambah} >
                        <img src={plus} alt='plus'className='w-full px-2'/> 
                        <span className='font-poppins font-[600] text-[18px] leading-[27px]'>Tambah</span>
                    </button>
                </div>
                <div className='flex flex-wrap w-full mx-auto '>
                    {/* CARD */}
                    {
                        loading
                        ?
                        <div className='w-full flex justify-center mx-auto'>
                            <ReactLoading  height={667} width={375} type={"bars"}/>
                        </div>
                        :
                        listActivity.length === 0
                        ?
                        <div className='flex justify-center'>
                            <img src={empty} alt='empty' />
                        </div>
                        :
                        listActivity.map((item,index)=>
                        <>
                            <div className='max-w-[235px] h-[234px] bg-white rounded-xl relative px-6 shadow-md flex w-1/4 mr-3.5 mb-7' id={item.id} key={item.title} data-cy="activity-item">
                                <div className=' h-4/5 w-full' >
                                    <div onClick={e=>handleClick(item.id)} className=' py-5 font-poppins font-[700] text-[18px] leading-[27px] h-full w-full text-left'  >
                                        <p className='font-[700] text-[18px] leading-[27px] text-left' data-cy="activity-item-title">{item.title}</p>
                                    </div>
                                    <div className='absolute bottom-6 flex justify-between w-3/4'>
                                        <p className='font-[500] text-[14px] leading-[21px] text-[#888888]' data-cy="activity-item-date">{format(new Date(), 'dd MMMM yyyy')}</p>
                                        <button 
                                                data-te-toggle="modal"
                                                data-te-target='#deleteModal'
                                                data-te-ripple-init 
                                                data-id={item.id}
                                                type="button" className=''><img src={trash} alt='trash' className='z-50' onClick={(e)=>handleKonfirmasi(e,item)} 
                                                data-cy="activity-item-delete-button"/>
                                        </button>

                                        


                                    </div>
                                </div>
                            </div>

                           
                           

                        </>
                        )

                        
                    }
                    
                    {/* END CARD */}

                     {/* MODAL Berhasil  */}
                     <button data-te-toggle='modal' data-te-target="#berhasil" ref={BerhasilRef} data-te-ripple-init className='bg-[#F4F4F4] hidden py-3 px-12 rounded-full '><span className='font-[600] text-lg leading-7' >Batal</span></button>
                     <div
                        data-te-modal-init
                        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                        tabIndex="-1"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-modal="true"
                        id='berhasil'
                        role="dialog"
                        data-cy="modal-information"
                        >
                        <div
                            data-te-modal-dialog-ref
                            className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                            <div
                            className="pointer-events-auto relative flex w-full rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 ">
                                <div className='flex my-5 mx-8'>
                                    <img src={information} alt='information' className='w-5 h-5' data-cy="modal-information-icon"/>
                                    <p className='px-3 text-[#111111]' data-cy="modal-information-title">Activity berhasil dihapus</p>
                                </div>
                            </div>
                            </div>
                        </div>

                    {/* MODAL delete*/}
                    <div
                                                data-cy="modal-delete"
                                                data-te-modal-init
                                                className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                                                id='deleteModal'
                                                tabIndex="-1"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-modal="true"
                                                role="dialog"
                                                
                                                >
                                                <div
                                                    data-te-modal-dialog-ref
                                                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                                                    <div
                                                    className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                                                    <div className='flex flex-col mx-auto justify-center p-14'>
                                                        <img src={danger} className='mx-auto' alt='danger' data-cy="modal-delete-icon"/>
                                                        <p className='py-12  font-[500] text-lg leading-7 text-center' data-cy="modal-delete-content">Apakah anda yakin menghapus activity<br/> <span className=' font-[700] text-lg leading-7 '>" {activity&&activity.title}"</span></p>
                                                    
                                                    <div className='flex justify-evenly'>
                                                        <button data-te-modal-dismiss data-te-ripple-init className='bg-[#F4F4F4] py-3 px-12 rounded-full'  data-cy="modal-delete-cancel-button"><span className='font-[600] text-lg leading-7' ref={CloseRef} onClick={()=>setActivity('')}>Batal</span></button>
                                                        <button data-cy="modal-delete-confirm-button" type='button' data-te-ripple-init className='bg-[#ED4C5C] py-3 px-12 rounded-full'  onClick={(e)=>handleDelete(e,activity&&activity.id)}><span className='font-[600] text-lg leading-7 text-white' >Hapus</span></button>
                                                    </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                    

                </div>
            </div>

            



            


        </div>
    </>
  )
}

export default Dashboard