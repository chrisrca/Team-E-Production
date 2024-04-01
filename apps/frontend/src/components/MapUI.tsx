import { useState } from "react";
import { Path } from "common/src/Path.ts";
import axios from "axios";
// import formInput, {FormInput} from "@/components/ui/formInput.tsx";

export default function SearchBar() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  async function submit() {
    console.log(`${start} gave the feedback of ${end}`);
    const feedBackData: Path = {
      start: start,
      end: end,
    };
    const res = await axios.post("/api/feedback", feedBackData, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log(res.data);
    }
  }

  function clear() {
    setEnd("");
    setStart("");
  }

  return (
    <div
      className={
        "justify-items-center absolute z-10 text-2xl rounded-2xl p-10 flex flex-col gap-5 rounded-2 float-left top-0"
      }
    >
      <div className={"px-10 py-5 flex flex-col rounded-2 border-white"}>
        <h1>Start</h1>
        <input
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
          }}
          type={"text"}
          className={"border-2 p-2 border-black rounded-2xl grow"}
        />
      </div>
      <div className={"px-10 py-5 flex flex-col rounded-2 border-white"}>
        <h1>End</h1>
        <input
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          className={"border-2 border-black p-2 rounded-2xl grow"}
        />
      </div>
      <div className={"grid grid-cols-2 justify-items-center"}>
        <button
          className={
            "border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl"
          }
          onClick={submit}
        >
          Search
        </button>
        <button
          className={
            "border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl"
          }
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
