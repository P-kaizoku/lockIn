import { useEffect, useState } from "react";
import motivationalQuotes from "../assets/index.ts";
import pfp from "../assets/pfp.jpg";

const Ribbon = () => {
  const [Today, setToday] = useState(new Date());
  const [randomQuote, setRandomQuote] = useState<{
    theme: string;
    quote: string;
    character: string;
  }>({
    theme: "",
    quote: "",
    character: "",
  });
  useEffect(() => {
    const quote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setRandomQuote(quote);
  }, [Today]);
  return (
    <div className="bg-neutral-800 font-monts text-indigo-200 border-t-2 border-neutral-600 py-4 flex space-x-6 items-center border-b-2  px-4 ">
      <section className=" px-3 py-1 font-monts border-2 border-indigo-200 rounded-md w-fit">
        <h1 className="text-4xl leading-12 tracking-tight ">Today is,</h1>
        <p className="text-sm tracking-wide text-orange-200">
          {new Date().toLocaleDateString()},{" "}
          {new Date().toLocaleString("default", { weekday: "short" })}
        </p>
      </section>
      <section className="flex-1 text-center ">
        <h1 className="text-3xl font-bold capitalize underline font-monts ">
          {randomQuote.theme}
        </h1>
        <p className="text-lg italic text-slate-200">{randomQuote.quote}</p> -{" "}
        <span className="font-bold">{randomQuote.character}</span>
      </section>
      <section className=" flex gap-4 justify-center items-center ">
        <img
          className="w-18 rounded-full border-4 border-blue-300"
          src={pfp}
          alt=""
        />
        <div>
          <h2 className="text-2xl tracking-tight">Hello, mf!</h2>
          <p className="text-sm tracking-wide text-red-300">
            Time to lock in now!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Ribbon;
