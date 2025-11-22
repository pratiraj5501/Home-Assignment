import { useEffect, useState } from "react";
import React from "react";
import { deleteShortLink, fetchLinkList } from "../services/linkService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";
import {
  FiLink,
  FiHash,
  FiCalendar,
  FiClock,
  FiArrowLeft,
  FiEye
} from "react-icons/fi";


const LinkTable=({fetchAgain , setFetchAgain})=> {
  const THEAD=["Short URL","Original URL","Clicks","Actions"];
  const [linkList,setLinkList]=useState([]);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

   
  // navigate to view page 
  const handleViewBtn=(code)=>{
    navigate(`/code/${code}`)
    
  }

  // show the delete modal
 const showDeleteModal = async() => {
  console.log("showing modal for delete..");

  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    return result.isConfirmed; // returns true/false
  });
};

 
// delete the shortLink 
const handleDeleteBtn = async (code) => {
  console.log("Delete btn called....")
  try {
     const result = await showDeleteModal();  // WAIT for user to confirm
     console.log("Hello result",result)

    if (!result) return; // If cancelled, stop here

    const res = await deleteShortLink(code);
     setFetchAgain((prev)=>!prev)


    Swal.fire({
      title: "Short Link Deleted!",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    console.log("after deleting..", res);

  } catch (error) {
    console.log("Delete error:", error);
  }
};

// fetch the links from server
  const fetchAllLinksFromServer=async()=>{
    try {
      setLoading(true);
      const res=await fetchLinkList();
      setLoading(false)
 
      setLinkList(res.data)

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    
    fetchAllLinksFromServer()

  },[fetchAgain]);
 

  return (
    <div className="w-full h-full p-4">
  <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 bg-white max-h-[350px]">

    {/* 1. LOADING */}
    {loading ? (
      <div className="w-full flex justify-center py-14">
        <Loader />
      </div>
    ) : (

      /* 2. EMPTY STATE */
      linkList.length === 0 ? (
        <div className="py-14 flex flex-col items-center justify-center text-gray-600">
          <FiLink className="text-4xl mb-3 text-gray-400" />
          <p className="text-lg font-medium">No links created yet</p>
          <p className="text-sm text-gray-400">Create your first short link to get started.</p>
        </div>
      ) : (

        /* 3. TABLE */
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              {THEAD.map((heading, index) => (
                <th key={index} className="px-5 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {heading}
                </th>
              ))}
             
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {linkList.map((link, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all duration-150">
                <td className="px-5 py-3  font-medium max-w-[180px] truncate">
                  {link.shortURL}
                </td>
                <td className="px-5 py-3 max-w-[260px] truncate" title={link.url}>
                  {link.url}
                </td>
                <td className="px-5 py-3 font-medium text-gray-800">
                  {link.clicks}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleViewBtn(link.code)}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteBtn(link.code)}
                      className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    )}

  </div>
</div>


    
  );
}
export default LinkTable