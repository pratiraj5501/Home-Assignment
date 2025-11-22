import { useState } from "react";
import React from "react";
import { createShortLink } from "../services/linkService";
 import Swal  from "sweetalert2"


const InputForm=({setFetchAgain})=> {
  // to store the URL
  const [url, setUrl] = useState("");

  // to store the code (Optional)
  const [code, setCode] = useState("");

  //  to boolean for changing button dynamically 
  const [generateCode,setGeneratingCode]=useState(false)


  // for submit the Form
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("URL:", url);
    console.log("Custom Code:", code);
    if(!url.trim()){
    Swal.fire({
      icon: "warning",
      title: "URL Required",
      text: "Please enter a URL to shorten.",
    });
    return;
    }

    // checking the url is correct or Not 
   try {
  new URL(url); // throws error if invalid
} catch (err) {
  Swal.fire({
    icon: "warning",
    title: "Invalid URL",
    text: "Please enter a valid URL that starts with http:// or https://",
  });
  return;
}

    
    try {
       const data={code,url}
       setGeneratingCode(true);
      const res=await createShortLink(data);
      setGeneratingCode(false);
      
      console.log("", res);
      
      setFetchAgain((prev)=>!prev)
      if(res.status===201){
         Swal.fire({
  title: "Success!",
  text: "Short link created.",
  icon: "success",
  timer: 1500,
  showConfirmButton: false,
})
      }
      
 
      
    } catch (error) {
       setGeneratingCode(false)
      // Check duplicate custom code → 409
    if (error?.response?.status === 409) {
      Swal.fire({
        icon: "error",
        title: "Custom Code Already Exists",
        text: "Please choose another short code.",
      });
      return;
    }

      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  
});
      console.log(error)  
    }

  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Create Short URL
      </h2>

      {/* URL INPUT */}
      <div>
        <label className="block text-gray-600 mb-1">Enter URL</label>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      {/* CUSTOM CODE INPUT */}
      <div>
        <label className="block text-gray-600 mb-1">Custom Short Code (optional)</label>
        <input
          type="text"
          placeholder="your-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button 
  type="submit"
  className={`w-full text-white py-2 rounded-md transition cursor-pointer
    ${generateCode ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
  disabled={generateCode}  // optional: disable button while generating
>
  {generateCode ? "Generating Link..." : "Generate Link"}
</button>

    </form>
  );
}
export default InputForm;