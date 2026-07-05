"use client";

import { useState } from "react";

export function Contact({setOpenModal}: {setOpenModal: (open: boolean) => void}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    invitationCode: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("Ուղարկվում է...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Պատվերը հաջողությամբ ուղարկվեց");
        setForm({
          name: "",
          phone: "",
          email: "",
          invitationCode: "",
          message: "",
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
    ${
      error
        ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-300"
        : value
        ? "border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-300"
        : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200"
    }`;

  return (
    <div className="min-h-screen  w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-6 py-24">
      <div className="w-full max-w-3xl">
        <div className=" relative bg-white md:rounded-2xl px-5 py-6 md:px-10 md:py-12 shadow-2xl border border-gray-200">
        <p className="absolute top-4 right-4 cursor-pointer text-3xl" onClick={() => setOpenModal(false)}>X</p>
          <h1 className="text-2xl md:text-5xl font-semibold text-center mt-5 mb-10">
            Պատվիրել հրավիրատոմս
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Անուն Ազգանուն *"
              value={form.name}
              onChange={handleChange}
              className={inputClasses(errors.name, form.name)}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Հեռախոսահամար *"
              value={form.phone}
              onChange={handleChange}
              className={inputClasses(errors.phone, form.phone)}
            />

            <input
              type="email"
              name="email"
              placeholder="Էլ․ հասցե"
              value={form.email}
              onChange={handleChange}
              className={inputClasses(false, form.email)}
            />

            <input
              type="text"
              name="invitationCode"
              placeholder="Հրավիրատոմսի կոդ *"
              value={form.invitationCode}
              onChange={handleChange}
              className={inputClasses(
                errors.invitationCode,
                form.invitationCode
              )}
            />

            <textarea
              name="message"
              rows={2}
              placeholder="Մեկնաբանություն"
              value={form.message}
              onChange={handleChange}
              className=" p-2 text-lg rounded-md md:rounded-xl outline-none transition border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 resize-none"
            />

            <button
              type="submit"
              className="cursor-pointer bg-red-950 text-white py-2 rounded-md md:rounded-xl text-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              Պատվիրել
            </button>
          </form>

          {status && (
            <p className="text-center mt-6 text-black text-lg">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}