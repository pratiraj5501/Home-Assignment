import React, { useEffect, useState } from "react";
import {
  FiLink,
  FiHash,
  FiCalendar,
  FiClock,
  FiArrowLeft,
  FiEye,
} from "react-icons/fi";
import { fetchSingleLinkStats } from "../services/linkService";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../services/baseURL";
import Swal from "sweetalert2";
import Loader from "./Loader";

const LinkDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [linkInfo, setLinkInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetchSingleLinkStats(code);
      setLinkInfo(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Fetching Stats",
        text: "Unable to load link information.",
      });
    } finally {
      setLoading(false);
    }
  };

   

  const handleVisitURL=(code)=>{
    (window.location.href = `${baseURL}/${code}`)
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
    <div className="w-full h-screen items-center mt-5 flex justify-center py-10 bg-gray-50 rounded-xl">
  <Loader />
</div>
    );

  if (!linkInfo)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">No Data Found</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl border border-gray-200">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiEye /> Link Details
        </h2>

        {/* Info List */}
        <div className="space-y-5 text-gray-700">

          <DetailRow icon={<FiHash />} label="ID" value={linkInfo?.id} />
          <DetailRow icon={<FiHash />} label="Code" value={linkInfo?.code} />

          {/* Original URL */}
          <div className="flex items-start gap-2">
            <FiLink className="text-purple-600 text-xl mt-1" />
            <div className="flex flex-col">
              <span className="font-semibold">Original URL:</span>
              <a
                href={linkInfo?.url}
                target="_blank"
                className="text-blue-600 underline hover:text-blue-800 break-all"
              >
                {linkInfo?.url}
              </a>
            </div>
          </div>

          {/* Short URL */}
          <div className="flex items-start gap-2">
            <FiLink className="text-yellow-600 text-xl mt-1" />

            <div className="flex flex-col w-full">
              <span className="font-semibold">Short URL:</span>

              <div className="flex items-center gap-3">
                <a
                  href={linkInfo?.shortUrl}
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800 truncate max-w-xs"
                >
                  {linkInfo?.shortUrl}
                </a>
 

                <button
                  onClick={() => handleVisitURL(linkInfo?.code)}
                  className="bg-blue-600 p-2 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm "
                >
                  Visit
                </button>
              </div>
            </div>
          </div>

          <DetailRow icon={<FiEye />} label="Clicks" value={linkInfo?.clicks} />

          <DetailRow
            icon={<FiCalendar />}
            label="Created At"
            value={new Date(linkInfo?.created_at).toLocaleString()}
          />

          <DetailRow
            icon={<FiClock />}
            label="Last Clicked"
            value={
              linkInfo.last_clicked
                ? new Date(linkInfo.last_clicked).toLocaleString()
                : "Never"
            }
          />
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <FiArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Row Component */
const DetailRow = ({ icon, label, value }) => (
  <p className="flex items-start gap-2">
    <span className="text-xl text-blue-600">{icon}</span>
    <span className="font-semibold">{label}:</span>
    <span className="text-gray-800 break-all">{value}</span>
  </p>
);

export default LinkDetails;
