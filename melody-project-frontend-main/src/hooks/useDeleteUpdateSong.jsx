import axios from "axios";
import { useState } from "react";

export const useDeleteUpdateSong = async (id) => {
  // const token = localStorage.getItem("userToken");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(id);

  // try {
  //   const response = await axios.delete(
  //     `https://melody-music-stream-production.up.railway.app/song/${id}`,
  //     {
  //       headers: {
  //         auth_token: token,
  //       },
  //     }
  //   );
  //   const result = await response.json;
  //   setData(result)
  //   console.log(result);
  //   window.location.reload();
  // } catch (error) {
  //   setError(error)
  //   console.log(error);
  // }

  // return data, error;
  return id;
};
