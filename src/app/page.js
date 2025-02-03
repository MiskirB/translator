"use client";

import Image from "next/image";
import { Dropdown } from "@/app/components/dropdown";
import { useState } from "react";
const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "amh", label: "Amharic" },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };
  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flew-row gap-4 ">
          <div className="container flex-col">
            <Dropdown
              name="languageFrom"
              value={languageFrom}
              options={languageOptions}
              onChange={handleLanguageFromChange}
            />
            <textarea className="border border-slate-800 round-md p-4" />
          </div>
          <div className="container flex-col">
            <Dropdown
              name="languageTo"
              value={languageTo}
              options={languageOptions}
              onChange={handleLanguageToChange}
            />
            <textarea className="border border-slate-800 round-md p-4" />
          </div>
        </div>
        <button className="p-2 rounded-md bg-slate-800 text-white" type="">
          translate
        </button>
      </main>
    </div>
  );
}
