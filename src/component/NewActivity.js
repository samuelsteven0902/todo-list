import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import plus from '../assets/img/dashboard/Group.png'
import back from '../assets/img/dashboard/back.png'
import sort from '../assets/img/dashboard/sort.png'
import edit from '../assets/img/dashboard/edit.png'
import trash from '../assets/img/dashboard/trash.png'
import newAct from '../assets/img/dashboard/newAct.png'
import danger from '../assets/img/dashboard/danger.png'
import az from '../assets/img/dashboard/az.png'
import za from '../assets/img/dashboard/za.png'
import baru from '../assets/img/dashboard/baru.png'
import lama from '../assets/img/dashboard/lama.png'
import information from '../assets/img/dashboard/information.png'
import blm from '../assets/img/dashboard/blm.png'
import check from '../assets/img/dashboard/check.png'

function NewActivity() {
    const [activity,setActivity] = useState();
    const [editActivity,setEditActivity] = useState();
    const [newActivityInput,setNewActivityInput] = useState({
        priority: 'very-high',
        title : '',
        color : 'ED4C5C',
        name :'Very High',
    });
    const [deleteObj,setDeleteObj] = useState([])

    const [loading,setLoading] = useState(true);
    const [isClick,setIsClick] = useState(false);
    const [sorting,setSorting] = useState();
    const [classSorting,setClassSorting] = useState('terbaru');

    const CloseRef = useRef();
    const CloseRefInput = useRef();
    const CloseRefEdit = useRef();
    const BerhasilRef = useRef();
    const ref = useRef(null);
    const { id }  = useParams();
    
    const fetchData = () =>{
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/`+ id ).then(res=>{
            // console.log(res);
            setActivity(res.data)
            setLoading(false)
            setSorting(res.data.todo_items)
        })
    }
    
    useEffect(() => {
        fetchData();
        // document.addEventListener('click',()=>handleClickOutside(activity), true)

    }, [newActivityInput])
    

    const handleSubmit = () =>{
        
        const data ={
            title : newActivityInput.title,
            activity_group_id : id,
            priority : newActivityInput.priority&&newActivityInput.priority.toLowerCase(),
        }

        // console.log(data);
        axios.post("https://todo.api.devcode.gethired.id/todo-items",data).then(res=>{
            fetchData();
            setNewActivityInput({
                priority: 'very-high',
                title : '',
                color : 'ED4C5C',
                name :'Very High',
            })
            CloseRefInput.current.click();
        })
    }
    
    const handleInput = (e) =>{
        e.persist();
        setNewActivityInput({...newActivityInput, [e.target.name]: e.target.value })
    }

    const handleInputPriority = (e,item) =>{
        e.preventDefault();
        setNewActivityInput({...newActivityInput, 'priority': e.target.value,'color': item.color,'name' :item.name })
        // setNewActivityInput({...newActivityInput, })
    }
    console.log(newActivityInput);



    const priority = [
        {
            color : 'ED4C5C',
            name : 'Very High',
            value : 'very-high'
        },
        {
            color : 'F8A541',
            name : 'High',
            value : 'high'
        },
        {
            color : '00A790',
            name : 'Medium',
            value : 'normal'
        },
        {
            color : '428BC1',
            name : 'Low',
            value : 'low'
        },
        {
            color : '8942C1',
            name : 'Very Low',
            value : 'very-low'
        },
    ]

    const handleCheck = (e,{is_active,priority,id}) =>{
        
        const data = {
            is_active : !is_active,
            priority : priority,
        }
        axios.patch('https://todo.api.devcode.gethired.id/todo-items/'+id,data).then(res=>{
            // console.log(res);
            fetchData();    
        })
        }

    
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete("https://todo.api.devcode.gethired.id/todo-items/"+deleteObj.id).then(res=>{
            fetchData();
            setDeleteObj('')
            CloseRef.current.click();
            BerhasilRef.current.click();


        })
    }
    // console.log(activity&&activity.title);

    const handleClickOutside = () =>{
        setIsClick(false)
        const data = { title:activity.title }
        axios.patch('https://todo.api.devcode.gethired.id/activity-groups/'+id,data).then(res=>{
            console.log(res);
        })
    }
    
    const handleEdit = (e,item) =>{
        setNewActivityInput(item)
    };


//    console.log(newActivityInput);

    const handleActivity = (e) =>{
        e.persist();
        setActivity({...activity,'title':e.target.value})
        console.log(e.target.value);
    }
    
    const atribut = newActivityInput && priority.find(({value})=> value === newActivityInput.priority )
    // // console.log(atribut);
    
    const handleEditSumbit = () =>{
        const data = {
            title: newActivityInput.title,
            priority: newActivityInput.priority, 
            is_active: newActivityInput.is_active
        }
        axios.patch("https://todo.api.devcode.gethired.id/todo-items/"+ newActivityInput.id ,data).then(res=>{
            fetchData();
            setNewActivityInput({
                priority: 'very-high',
                title : '',
                color : 'ED4C5C',
                name :'Very High',
            })
            CloseRefEdit.current.click();
        })

    }

    const sortBy = [
        {
            gambar:baru,
            name : 'Terbaru',
            value: 'terbaru' ,
        },
        {
            gambar:lama,
            name : 'Terlama',
            value:'terlama',
        },
        {
            gambar:az,
            name : 'A-Z',
            value:'az',
        },
        {
            gambar:za,
            name : 'Z-A',
            value:'za',
        },
        {
            gambar:blm,
            name : 'Belum Selesai',
            value:"belum_selesai",
        },
    ]
    console.log(activity&&activity.todo_items);
    
    const handleSortBy = (e,{value}) =>{
        e.preventDefault();
        const baru = [...activity.todo_items].sort((a,b)=>b.id - a.id)
        const lama = [...activity.todo_items].sort((a,b)=>a.id - b.id)
        const belomSelesai = [...activity.todo_items].sort((a,b)=>b.is_active - a.is_active)
        const az = [...activity.todo_items].sort((a, b) =>
        a.name > b.name ? 1 : -1,
        );
        const za = [...activity.todo_items].sort((a, b) =>
            a.name > b.name ? -1 : 1,
        );

        console.log(e.target.value);
        console.log(e.target);
        if(e.target.value === 'terbaru')
        {
            setSorting(baru)
            setClassSorting('terbaru')
            // console.log(baru);
        }else if(e.target.value === 'terlama'){
            setSorting(lama)
            setClassSorting('terlama')
            // console.log(lama);
        }else if(e.target.value ==='az'){
            setSorting(az)
            setClassSorting('az')
            // console.log(az);
        }else  if(e.target.value ==='za'){
            setSorting(za)
            setClassSorting('za')
            // console.log(za);
        }else if(e.target.value === 'belum_selesai')
        {
            setSorting(belomSelesai)
            setClassSorting('belum_selesai')
        }
    }
    
    return (
    <>
    <div className='min-h-screen bg-[#F4F4F4]'>
            <div className='bg-[#16ABF8]'>
                <div className='max-w-[1000px] container mx-auto flex'>
                    <p className='text-white font-poppins mt-[38px] mb-[31px]  font-[700] leading-[36px] text-[24px]'>TO DO LIST APP</p>
                </div>
            </div>
            <div className='max-w-[1000px] container mx-auto '>
                <div className='flex justify-between my-12'>
                    <div className='flex items-center'>
                        <Link to={'/'}><img src={back} alt='back/' className='h-max ' data-cy="todo-back-button"/></Link>
                        {
                            isClick
                            ?
                            <input  autoFocus type="text" className='!outline-none border-x-0 border-t-0 border-b-2 ring-0 bg-transparent font-poppins font-[700] text-4xl leading-[54px] px-9 focus:ring-0   border-black focus:border-black  focus:border-b-2 focus:border-x-0 focus:border-t-0 ' id='inputName' value={activity.title} onChange={handleActivity} onBlur={handleClickOutside} />
                            :
                            <p data-cy="todo-title" id='editName' className='block font-poppins font-[700] text-4xl leading-[54px] px-9'  onClick={e=>setIsClick(!isClick)} >{activity&&activity.title}</p>
                        }
                        <button ref={ref} data-cy="todo-title-edit-button" ><img src={edit} alt='back/' className='h-max ' onClick={e=>setIsClick(!isClick)} /></button>

                    </div>

                    <div className='flex'>
                        <button data-cy="todo-sort-button" className='z-[1060] w-14 rounded-full ring-2 ring-[#E5E5E5] flex justify-center items-center mx-5' type="button"
                                            name='sortBy'
                                            id="sortBy"
                                            data-te-dropdown-toggle-ref
                                            aria-expanded="false"
                                            data-te-ripple-init
                                            >
                            <img src={sort} alt='sort' className='flex justify-center cursor-pointer' />
                        </button>

                        {/* DropDown Sort */}
                        <div data-cy="sort-parent"
                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block w-60"
                            aria-labelledby="dropdownMenuButton1"
                            data-te-dropdown-menu-ref>
                            {
                                                sortBy.map(item => 
                                                    
                                                        
                                                         <button key={item.id} data-cy="sort-selection"
                                                            className={`flex items-center whitespace-nowrap bg-transparent py-3 px-4 text-lg font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 w-full ${item.value !== classSorting ?'':'bg-gray-500' } `}
                                                            data-te-dropdown-item-ref name='priority' onClick={e=>handleSortBy(e,item)} value={item.value} 
                                                            ><img src={item.gambar} alt={item.value} className='ml-3 mr-3 w-5' data-cy='sort-selection-icon'/>
                                                            <button data-cy="sort-selection-title"   onClick={e=>handleSortBy(e,item)} value={item.value} >{item.name}</button>
                                                            {item.value !== classSorting ? '':<img src={check} alt='check' className='absolute end-0 mr-5' data-cy='sort-selection-selected'/>}
                                                            </button>
                                                    )
                                            }
                        </div>
                        {/* DropDown Sort selesai */}


                        <button data-cy="todo-add-button" className='bg-[#16ABF8] flex items-center px-4 py-2 rounded-full text-white z-50' data-te-toggle="modal" data-te-target="#exampleModalCenter" data-te-ripple-init>
                            <img src={plus} alt='plus'className='w-full px-2'/> 
                            <span className='font-poppins font-[600] text-[18px] leading-[27px] pr-5 pl-1'>Tambah</span>
                        </button>
                    </div>
                </div>

                <div>
                    {
                        sorting && sorting.length === 0 
                        ?
                        <div className='flex justify-center cursor-pointer'  data-te-toggle="modal" data-te-target="#exampleModalCenter"  data-cy="todo-empty-state">
                            <img src={newAct} alt='newAct' />
                        </div>
                        :
                        sorting && sorting.map((item)=>{
                            let colorPrior = '';
                            priority.map((obj)=> {
                                if(obj.value.toLowerCase() === item.priority)
                                {
                                   colorPrior+=obj.color
                                }
                            }) 
                        return(
                            // CARD Panjang
                            <>
                                <div className='w-full rounded-xl shadow-[0_6px_10px_rgba(0,0,0,0.3)] bg-white mb-3' key={item.id} >
                                    <div data-cy='todo-item' className='flex justify-between px-7 py-8'>
                                        <div className='flex items-center'>
                                            <input data-cy="todo-item-checkbox" type='checkbox' checked={!item.is_active} id={item.id} onChange={e=>handleCheck(e,item)} className='bg-white text-[#16abf8] border-[#C7C7C7] h-6 w-6 flex items-center justify-center border-2 active:ring-[#16abf8] checked:border-[#16abf8] checked:ring-[#16abf8]'/>
                                            <svg height="14" width="14"  viewBox="0 0 100 100" className='mr-4 ml-5'>
                                                <circle data-cy="todo-item-priority-indicator" cx="50" cy="50" r="50" fill={'#'+colorPrior} />
                                            </svg>
                                            <p data-cy="todo-item-title"  onClick={e=>handleEdit(e,item)} className={`${item.is_active === 0 ? 'line-through text-[#888888]':""} text-lg leading-7 cursor-pointer`}>{item.title}</p>
                                            <button data-cy="todo-item-edit-button" type='button' data-te-toggle="modal" data-te-target="#ModalEdit" onClick={e=>handleEdit(e,item)}><img src={edit} alt='back' className='h-max mx-5' /></button>
                                        </div>
                                        <button data-cy="todo-item-delete-button" data-te-toggle='modal'  data-te-ripple-init data-te-target="#ModalDelete"><img src={trash} alt='trash' className='' onClick={e=>setDeleteObj(item)}/></button>
                                    </div>
                                </div>
                            </>
                        )
                       }
                       
                        )
                    }
                </div>
                
            
            </div>

            {/* Modal Input Mulai  */}
            <div
                data-cy="modal-add"
                data-te-modal-init
                className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalCenter"
                tabIndex="-1"
                ariaLabelledby="exampleModalCenterTitle"
                ariaModal="true"
                role="dialog">
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[403] min-[576px]:max-w-[830px]">
                    <div
                    className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                        className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                        id="exampleModalScrollableLabel"
                        data-cy='modal-add-title'>
                        Tambah List Item
                        </h5>
                        <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss
                        aria-label="Close"  ref={CloseRefInput} data-cy='modal-add-close-button'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>

                    <div className="relative p-8">
                        <form>
                            <div className='flex flex-col'>
                                <label data-cy='modal-add-name-title' for='title' className='text-xs font-semibold leading-4 py-2' >NAMA LIST ITEM</label>
                                <input data-cy='modal-add-name-input' type='text' name='title' id='title' onChange={handleInput} value={newActivityInput.title} className='rounded-md h-[52px] border-[#E5E5E5] placeholder:leading-6 placeholder:font-poppins placeholder:text-[#A4A4A4]' placeholder='Tambahkan nama list item' />
                            </div>
                            <div className='flex flex-col'>
                                <label data-cy='modal-add-priority-title' for='dropdownMenuButton1' className='text-xs font-semibold leading-4 py-2'>PRIORITY</label>
                                
                                    <div>
                                        <div className="relative " data-te-dropdown-ref>
                                        
                                        <button
                                            className="flex items-center whitespace-nowrap rounded ring-1 ring-[#E5E5E5] outline-[#E5E5E5] text-[#111111] border-[#E5E5E5] px-6 pt-2.5 pb-2  leading-normal  transition duration-150 ease-in-out motion-reduce:transition-none w-[205px] justify-between"
                                            type="button"
                                            name='priority'
                                            id="dropdownMenuButton1"
                                            data-te-dropdown-toggle-ref
                                            aria-expanded="false"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            data-cy='modal-add-priority-dropdown'
                                            
                                            >
                                                
                                            {
                                                newActivityInput.priority === ""
                                                ?
                                                "Pilih Priority"
                                                : 
                                                <div data-cy='modal-add-priority-item' className='flex items-center'>
                                                    <svg height="14" width="14"  viewBox="0 0 100 100" className='mr-4'>
                                                        <circle cx="50" cy="50" r="50" fill={'#'+newActivityInput.color} />
                                                    </svg>
                                                    
                                                    <span>{newActivityInput.name}</span>
                                                </div>
                                            }
                                            <span className="ml-2 w-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                className="h-5 w-5" data-cy='modal-add-priority-dropdown'>
                                                <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd" data-cy='modal-add-priority-dropdown'/>
                                            </svg>
                                            </span>
                                        </button>
                                        <ul
                                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                            aria-labelledby="dropdownMenuButton1"
                                            data-te-dropdown-menu-ref>
                                            {
                                                priority.map(item => 
                                                    
                                                    
                                                        
                                                         <button
                                                            data-cy="modal-add-priority-item" key={item.id}
                                                            className="flex items-center whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 w-[205px]"
                                                            data-te-dropdown-item-ref name='priority' onClick={e=>handleInputPriority(e,item)} value={item.value}
                                                            ><svg height="14" width="14"  viewBox="0 0 100 100" className='mr-5'>
                                                                <circle value={item.value}  cx="50" cy="50" r="50" fill={'#'+item.color} />
                                                            </svg>{item.name}
                                                            </button>
                                                  
                                                    )
                                            }
                                        </ul>
                                        </div>
                                    </div>


                            </div>
                        </form>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 px-10 py-5 dark:border-opacity-50">
                        <button
                        data-cy="modal-add-save-button"
                        type="submit"
                        className="bg-[#16ABF8] rounded-full text-white py-3 px-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={handleSubmit}
                        disabled={!newActivityInput.title}> 
                        Simpan
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit Mulai */}
            <div
                data-te-modal-init
                className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="ModalEdit"
                tabIndex="-1"
                ariaLabelledby="exampleModalCenterTitle"
                ariaModal="true"
                role="dialog">
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[403] min-[576px]:max-w-[830px]">
                    <div
                    className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                        className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                        id="exampleModalScrollableLabel">
                        Edit Item
                        </h5>
                        <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss
                        ariaLabel="Close"  ref={CloseRefEdit} onClick={()=>setNewActivityInput({...newActivityInput,title : ''})} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>

                    <div className="relative p-8">
                        <form>
                            <div className='flex flex-col'>
                                <label className='text-xs font-semibold leading-4 py-2'>NAMA LIST ITEM</label>
                                <input type='text' name='title' onChange={handleInput} value={newActivityInput.title} className='rounded-md h-[52px] border-[#E5E5E5] placeholder:leading-6 placeholder:font-poppins placeholder:text-[#A4A4A4]' placeholder='Tambahkan nama list item'  />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-xs font-semibold leading-4 py-2'>PRIORITY</label>
                                
                                    <div>
                                        <div className="relative " data-te-dropdown-ref>
                                        
                                        <button
                                            className="flex items-center whitespace-nowrap rounded ring-1 ring-[#E5E5E5] outline-[#E5E5E5] text-[#111111] border-[#E5E5E5] px-6 pt-2.5 pb-2  leading-normal  transition duration-150 ease-in-out motion-reduce:transition-none w-[205px] justify-between"
                                            type="button"
                                            name='priority'
                                            id="dropdownMenuButton1"
                                            data-te-dropdown-toggle-ref
                                            aria-expanded="false"
                                            data-te-ripple-init
                                            data-te-ripple-color="light">
                                            {
                                                newActivityInput.priority === ""
                                                ?
                                                "Pilih Priority"
                                                : 
                                                <div className='flex items-center'>
                                                    <svg height="14" width="14"  viewBox="0 0 100 100" className='mr-4'>
                                                        <circle cx="50" cy="50" r="50" fill={atribut&&'#'+atribut.color} />
                                                    </svg>
                                                    
                                                    <span>{atribut&&atribut.name}</span>
                                                </div>
                                            }
                                            <span className="ml-2 w-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                className="h-5 w-5">
                                                <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd" />
                                            </svg>
                                            </span>
                                        </button>
                                        <ul
                                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                            aria-labelledby="dropdownMenuButton1"
                                            data-te-dropdown-menu-ref>
                                            {
                                                priority.map(item => 
                                                    
                                                    <li key={item.id}>
                                                        
                                                         <button
                                                            className="flex items-center whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 w-[205px]"
                                                            data-te-dropdown-item-ref name='priority' onClick={e=>handleInputPriority(e,item)} value={item.value}
                                                            ><svg height="14" width="14"  viewBox="0 0 100 100" className='mr-5'>
                                                                <circle cx="50" cy="50" r="50" fill={'#'+item.color} />
                                                            </svg><span>{item.name}</span>
                                                            </button>
                                                    </li>
                                                    )
                                            }
                                        </ul>
                                        </div>
                                    </div>


                            </div>
                        </form>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 px-10 py-5 dark:border-opacity-50">
                        <button
                        type="button"
                        className="bg-[#16ABF8] rounded-full text-white py-3 px-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={handleEditSumbit}>
                        Simpan
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Modal Delete Mulai*/}
             <div
                data-cy="modal-delete"

                data-te-modal-init
                className="fixed top-0 left-0 z-[1055] h-full w-full hidden overflow-y-auto overflow-x-hidden outline-none"
                id="ModalDelete"

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
                        <img src={danger} className='mx-auto' alt='danger'/>
                        <p className='py-12  font-[500] text-lg leading-7 text-center'>Apakah anda yakin menghapus activity<br/> <span className=' font-[700] text-lg leading-7 '>"{deleteObj.title}"</span></p>
                    
                    <div className='flex justify-evenly'>
                        <button data-te-modal-dismiss data-te-ripple-init className='bg-[#F4F4F4] py-3 px-12 rounded-full'><span className='font-[600] text-lg leading-7' onClick={e=>setDeleteObj('')}  ref={CloseRef} >Batal</span></button>
                        <button   data-cy="modal-delete-confirm-button" type="button" data-te-ripple-init className='bg-[#ED4C5C] py-3 px-12 rounded-full' ><span className='font-[600] text-lg leading-7 text-white' onClick={handleDelete}>Hapus</span></button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

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

    </div>
    </>
  )
}

export default NewActivity