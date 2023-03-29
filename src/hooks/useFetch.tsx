import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint: string) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios(endpoint);
    setData(result.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  return data; //[data, load, err];
};

export default useFetch;
