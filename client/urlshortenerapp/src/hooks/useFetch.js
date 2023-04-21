import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  async function getData(url, body, method) {
    try {
      setError("")
      const res = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400) {
        throw new Error("Something went wrong.")
      }
      const resData = await res.json();
      setData(resData.id);

    } catch (err) {
      setError(err.message);
      setData("")
      console.log(err.message);
    }
  }

  return {
    data: data,
    error: error,
    getData: getData
  }
};
export default useFetch;
