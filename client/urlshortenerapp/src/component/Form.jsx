import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Form = () => {
  const [longURLValue, setLongURLValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFocus, setisFocus] = useState(false);

  const { getData, data, error } = useFetch();
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (longURLValue.length === 0) {
      setErrorMsg("Please enter a URL");
      return;
    }
    getData(
      `${import.meta.env.VITE_URL}create`,
      {
        url: longURLValue,
      },
      "POST"
    );
    setLongURLValue("");
  };
  const HandleChange = (e) => {
    setErrorMsg("");
    setLongURLValue(e.target.value.trim());
    if (e.target.value.length === 0 && isFocus) {
      setErrorMsg("Please enter a URL");
      return;
    }
  };
  return (
    <div>
      <form onSubmit={HandleSubmit} className="">
        <input
          type="text"
          className={`outline-none border border-black rounded-sm px-3 py-2 w-2/5 mx-4 ${
            errorMsg ? "border-red-700" : ""
          }`}
          onChange={HandleChange}
          onFocus={() => setisFocus(true)}
          onBlur={() => setisFocus(false)}
          value={longURLValue}
        />
        <button
          type="submit"
          className="px-3 py-1 border bg-blue-300 hover:bg-blue-400 rounded-sm"
        >
          Shorten URL
        </button>
      </form>
      <p className="text-red-700 my-2">{errorMsg}</p>
      {data?.length > 0 && (
        <div className="my-4 mx-2 w-5/5 flex justify-center items-center">
          <p>Your Shorten URL :</p>

          <div className="mx-4 ">
            <a
              href={`${import.meta.env.VITE_URL}get/${data}`}
              target="_blank"
              className="font-semibold text-xl"
            >
              {`${import.meta.env.VITE_URL}get/${data}`}
            </a>
          </div>
        </div>
      )}

      {error && <p className="text-red-700 my-2"> {error} </p>}
    </div>
  );
};
export default Form;
