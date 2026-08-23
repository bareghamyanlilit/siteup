"use client";

import { useEffect, useState } from "react";
import { Footer } from "./Footer";

export function Contact({ setOpenModal, item }: { setOpenModal: (open: boolean) => void, item: any }) {

  const all = {
    "Հյուրերի գրանցման համակարգ": 3000,
    "Թարգմանություն": 4000,
    "Դրես Կոդ": 1000,
    "Գալերյա հատված": 2000,
    "Նամակի հատված": 1000,
    "Կալենդար հատված": 1000,
    "Աստվածաշնչյան հատված": 1500
  }
  const gner = [3000, 4000, 1000, 2000, 1000, 1000, 1500]
  const [newObj, setNewObj] = useState(item.data)
  const [data, setData] = useState(newObj);
  let [price, setPrice] = useState(+item.discount)

  const hashvark = () => {
    console.log("newObj", newObj);
    console.log("data", data);
    console.log("all", all);

    Object.entries(newObj).forEach(([newObjkey, newObjvalue]) => {
      Object.entries(data).forEach(([datakey, datavalue]) => {
        if (newObjkey == datakey) {
          if (datavalue != newObjvalue) {
            if (datavalue == false && newObjvalue == true) {
              Object.entries(all).forEach(([allkey, allvalue]) => {
                if (allkey == datakey) {
                  setPrice(prev => prev - allvalue)
                }
              })
            } else if (datavalue == true && newObjvalue == false) {
              Object.entries(all).forEach(([allkey, allvalue]) => {
                if (allkey == datakey) {
                  setPrice(prev => prev + allvalue)
                }
              })
            }
          }
        }
      })
    })
  }
  useEffect(() => {
    hashvark()
  }, [data])

  const fields = [
    ["name", "Անուն Ազգանուն *"],
    ["phone", "Հեռախոսահամար *"],
    ["email", "Էլ․ հասցե"],
    ["message", "Մեկնաբանություն"],
    ["names", "Անունները"],
    ["day", "Առիթի օրը"],
    ["time1", "Փեսայի տան ժամը"],
    ["addres1", "Փեսայի տան հասցեի ԼԻՆԿԸ"],
    ["time2", "Հարսի տան ժամը"],
    ["addres2", "Հարսի տան հասցեի ԼԻՆԿԸ"],
    ["time3", "Եկեղեցու ժամը"],
    ["addres3", "Եկեղեցու հասցեի ԼԻՆԿԸ"],
    ["time4", "Ռեստորանի ժամը"],
    ["addres4", "Ռեստորանի հասցեի ԼԻՆԿԸ"],
    ["music", "Երգը և որ վարկյանից սկսվի"],
  ];
  const [form, setForm] = useState<any>({
    name: "",
    phone: "",
    email: "",
    message: "",
    day: "",
    names: "",
    time1: "",
    addres1: "",
    time2: "",
    addres2: "",
    time3: "",
    addres3: "",
    time4: "",
    addres4: "",
    music: "",
    data: Object.entries(data)
      .map(([key, value]) => `${value ? "✅" : "❌"} ${key}`)
      .join("\n"),
    price: price
  });


  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<any>({
    name: false,
    phone: false,
    invitationCode: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name in errors) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  const validate = () => {
    const newErrors = {
      name: form.name.trim() === "",
      phone: form.phone.trim() === "",
      invitationCode: form.invitationCode.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
let code=item.code
    if (!validate()) return;

    setStatus("Ուղարկվում է...");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form },code),
      });


      if (res.ok) {
        setStatus("✅ Պատվերը հաջողությամբ ուղարկվեց");
        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
          day: "",
          names: "",
          time1: "",
          addres1: "",
          time2: "",
          addres2: "",
          time3: "",
          addres3: "",
          time4: "",
          addres4: "",
          music: "",
          data: ""
        });
      } else {
        setStatus("❌ Սխալ տեղի ունեցավ");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Սերվերի հետ կապ հաստատել չհաջողվեց");
    }
  };

  const inputClasses = (error: boolean, value: string) =>
    `p-2 text-lg rounded-md md:rounded-xl outline-none transition border
    ${error
      ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-300"
      : value
        ? "border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-300"
        : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200"
    }`;

  return (
    <div className="h-screen w-full bg-white overflow-scroll w-full fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className=" py-10  px-8 ">

        <p className="absolute z-10  top-4 right-4 cursor-pointer text-4xl" onClick={() => setOpenModal(false)}>X</p>
        <h1 className="text-3xl md:text-5xl font-semibold text-center mt-5 mb-10">
          Պատվիրել հրավիրատոմս
        </h1>
        <p className="text-xl text-start">
          Պատվիրելու համա `<br /> <br />. Ընտրեք համապատասխան հատվածները որոնք կցանկանաք լինեն հրավիրատոմսում <br />. Լրացրեք անհրաժեշտ տվյալները <br /><br /> Որից հետո կապ կհաստատենք Ձեզ հետ Հստակեցումից հետո ժամերի ընթացքում Ձեր հրավիրատոմսը պատրաստ կլինի
        </p><br />

        <div className="grid gap-3 text-start">
          {Object.entries(data).map(([key, value]: any, i) => {
            return <label
              key={i}
              htmlFor={`${i}`}
              className="block rounded-2xl  p-4 shadow-sm  bg-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-vrayi">{key}</p>
                  <p className="text-base text-gray-500 mt-1">{gner[i]} ֏</p>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${value
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-900"
                    }`}
                >
                  {value ? "Հանել" : "Ավելացնել"}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`${i}`}
                  checked={value}
                  className="w-5 h-5 accent-[#580000]"
                  onChange={(e) => {
                    setData((prev: any) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }));
                    setNewObj(data)
                  }}
                />

                <span className="text-gray-600">
                  {value ? "Ներառված է" : "Սեղմիր ավելացնելու համար"}
                </span>
              </div>
            </label>
          })}
        </div>

        <h1 className="text-2xl my-10 font-bold">Կազմեց ։ {price} դրամ</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <h1 className="text-xl text-start ">Կոդը : {item.code}</h1>

          {fields.map(([name, placeholder], i) => {
            if (i <= 3) {
              return <input
                key={name}
                type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className={inputClasses(
                  errors[name],
                  form[name]
                )}
              />
            }
          }
          )}
          <h1 className="text-2xl font-bold">Հրավիրատոմսի տվյալները</h1>
          {fields.map(([name, placeholder], i) => {
            if (i > 3) {
              return <input
                key={name}
                type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className={inputClasses(
                  errors[name],
                  form[name]
                )}
              />
            }
          }
          )}

          <h1 className="text-xl text-start">Նկարների քանակը - {item.imgcount} <br />Ուղարկեք նշված էլ․հասցեին </h1>
          <a className="text-xl text-start" href="mailto:siteup.am@gmail.com">siteup.am@gmail.com</a>
          <button
            type="submit"
            className="cursor-pointer bg-bg text-white py-2 rounded-md md:rounded-xl text-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            Պատվիրել
          </button>
        </form>

        {status && (
          <p className="text-center mt-6 text-black text-lg">{status}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}