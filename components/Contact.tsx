"use client";

import { useState } from "react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    const newErrors = {
      name: form.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(form.email),
      message: form.message.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ An error occurred, please try again");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server connection problem");
    }
  };

  const inputClasses = (error: boolean, value: string) =>
    `p-4 text-lg  rounded-md md:rounded-xl outline-none transition border
    ${
      error
        ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-300"
        : value
        ? "border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-300"
        : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center md:px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full max-w-6xl">
        <div className="text-white flex flex-col gap-5 md:gap-10 px-6 md:px-0">
          <h1 className="text-4xl text-center md:text-6xl font-semibold tracking-tight">
            Պատվիրել <span className="text-red-950"></span>
          </h1>
          <Label
            name="Էլ․ հասցե"
            href="mailto:baregamyanlilit36@gmail.com"
            text="baregamyanlilit36@gmail.com"
          />
          <Label name="Հեռախոսահամար" href="tel:+37477760204" text="077-76-02-04" />
        </div>

        <div className="bg-white  w-full md:w-auto md:rounded-2xl px-5 py-6 md:px-10 md:py-12 shadow-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input
              type="text"
              name="name"
              placeholder="Ձեր անունը"
              value={form.name}
              onChange={handleChange}
              className={inputClasses(errors.name, form.name)}
            />

            <input
              type="email"
              name="email"
              placeholder="Ձեր էլ հասցեն"
              value={form.email}
              onChange={handleChange}
              className={inputClasses(errors.email, form.email)}
            />

            <textarea
              name="message"
              rows={6}
              placeholder="Հաղորդագրություն (Հեռախոսահամարը ցանկալի է)"
              value={form.message}
              onChange={handleChange}
              className={inputClasses(errors.message, form.message)}
            />

            <button className="cursor-pointer bg-red-950 text-white py-4 rounded-xl text-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
              Ուղարկել 
            </button>
          </form>

          {status && (
            <p className="text-center mt-4 text-black text-lg">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({
  name,
  href,
  text,
}: {
  name: string;
  href: string;
  text: string;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/5 p-3 md:p-6 rounded-md md:rounded-2xl shadow-xl ">
      <p className="text-gray-200 text-lg">{name}</p>
      <a
        href={href}
        className="text-base md:text-2xl font-medium hover:text-red-950 transition"
      >
        {text}
      </a>
    </div>
  );
}
