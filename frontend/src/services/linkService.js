import instance from "./baseURL"

export const fetchLinkList=async()=>{
  try {
    const response=await instance({
      url:'/api/links',
      method:"GET",

    })
    return response;
    
  } catch (error) {
    console.log(error)
    
  }
}

export const RedirectURLClick=async(code)=>{
  console.log("my code sss",code)
  try {
    const response=await instance({
      url:`/api/links`,
      method:"GET",

    })
    console.log("redirect response...",response)
    
  } catch (error) {
    console.log("error while redirecting your URL",error)
    
  }

}


export const fetchSingleLinkStats=async(code)=>{
  try {
    console.log("is this is code?",code)
    const response=await instance({
      url:`/api/links/${code}`,
      method:"GET"

    })
    return response;
    
  } catch (error) {
    console.log("error while fetching single Link",error)
    
  }
}


export const createShortLink=async(data)=>{
  try {
    
    const response=await instance({
      url:'/api/links',
      method:"POST",
      data:data
    })
    return response;
  } catch (error) {
    console.log("Error while creating new short Link",error)
     throw error;   
  }
}

export const deleteShortLink=async(code)=>{
  try {
    console.log("DELETE0000",code)
    const response=await instance({
      url:`/api/links/${code}`,
      method:"DELETE",
    })
    return response;
    
  } catch (error) {
    console.log("error while deleting the shortLink",error)
    
  }
}