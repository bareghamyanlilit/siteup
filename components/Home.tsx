"use client";
import { priceList, works } from "@/const/const";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

export function Home() {
  const [filter, setFilter] = useState("Բոլորը");
  const filteredWorks = filter === "Բոլորը" ? works : works.filter((work) => work.name === filter);
  const filters = ["Բոլորը", "Հարսանեկան", "Ծննդյան", "Կնունքի ", "Բանակի", "Նշանադրության"];
  return (
    <main className="FontMassis  bg-cover text-center relative bg-center w-full overflow-hidden ">
      <div className="min-h-[90vh] bg-bg relative">
        <div className=" absolute z-0 bg-white rotate-45 w-[150vw] h-[150vw] -top-23 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col pt-20  justify-around h-full w-full absolute z-10 left-1/2 -translate-x-1/2 text-center">
          <h1 className=" font-bold text-3xl">ԹՎԱՅՆԱՑՄԱՆ ԱՆՑՆԵԼՈՒ ԺԱՄԱՆԱԿՆ Է</h1>
          <p className="text-white text-2xl mt-20">Վեբ Հրավիրատոմսեր <br /> ցանկացած առիթի համար</p>
          <Image alt="first"
            src='/first.png' width={600} height={600}
            className=" w-[90%] mx-auto" />
        </div>
      </div>

      <div className=" grid gap-8 justify-items-center">
        <h1 className="font-bold mt-10 text-3xl text-center w-[90%] mx-auto ">Հրավիրատոմսերի տեսականի</h1>
        <div className="flex gap-4 justify-center flex-wrap">
          {filters.map((e) => (
            <button
              key={e}
              onClick={() => setFilter(e)}
              className={`border borderR border-[#580000] px-4 py-2 ${filter === e ? "bg-[#580000] text-white" : "text-[#580000]"}`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="container m-auto grid grid-cols-2 gap-4 px-2">
          {filteredWorks.map((e) => (
            <div
              key={e.code}
              className=" borderR h-85 border border-[#580000]"
            >
              <Image
                className="rounded-t-[10px] object-cover w-full h-50 "
                src={e.src}
                width={500}
                height={500}
                alt={e.name}
              />
              <div className="text-sm w-full px-2 py-2 flex h-35 flex-col  justify-between">

                <h2 className=" text-base text-center  ">
                  {e.name}
                </h2>
                <h2 className="text-center ">
                  Կոդ: {e.code}
                </h2>
                <div className="flex gap-4 justify-center">

                  <h2 className="text-center my-2 flex">
                    <p>Գին:</p>
                    <p className={`${e.discount ? "line-through" : ""}`}>{e.price} </p>
                  </h2>
                  {e.discount && (
                    <h2 className="  text-center my-2 ">
                      {e.discount}
                    </h2>
                  )}
                </div>
                <div className="w-full flex justify-between ">
                  <Link
                    href={e.link}
                    className=" borderR  bg-bg text-white px-3 py-2 w-max"
                  >
                    Տեսնել
                  </Link>
                  <Link 
                    href={e.link}
                    className="borderR bg-bg text-white  px-3 py-2 w-max"
                  >
                    Պատվիրել
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-2">
          <h1 className="font-bold text-2xl text-center mx-auto py-10">Ավելացումների գնացուցակ</h1>
          {priceList.map((item) => (
            <div key={item.name} className="mb-10">
              <div className="flex ">

                <h2 className="w-full mb-5 font-bold text-center text-xl">{item.name} - արժեքը՝ {item.price} </h2>
              </div>
              <div className="flex">

                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="w-[40%] h-auto my-4"
                  />
                )}
                <p className=" px-2 content-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
