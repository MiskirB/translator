"use client";
import Image from "next/image";
import { Dropdown } from "@/app/components/dropdown";
import { useState, useOptimistic } from "react";
import { translate } from "@/app/actions/translate";
import VoiceRecorder from "@/app/components/voice-recorder";
import SaveBtn from "@/app/components/save-translation-btn";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "amh", label: "Amharic" },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    setIsSaved(true);
  };

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputSet = async (value) => {
    setInputText(value);
    const formData = new FormData();
    formData.append("text", value);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Translate with <span className="text-[#804dee] ">Tongue</span>
        </h1>
        <p className="mt-3 text-sm sm:text-lg text-gray-500 max-w-md sm:max-w-2xl mx-auto">
          Break language barriers instantly with our powerful translation app.
          Try it now!
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          <form
            className="w-full"
            action={async (formData) => {
              const result = await translate(formData);
              setTranslatedText(result.translation);
              if (isSaved) setIsSaved(false);
            }}
          >
            {/* Language Selection & Input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <Dropdown
                  name="languageFrom"
                  value={languageFrom}
                  options={languageOptions}
                  onChange={handleLanguageFromChange}
                />
                <textarea
                  placeholder="Enter text to translate"
                  className="border border-gray-300 rounded-md p-3 mt-2 w-full text-sm"
                  value={inputText}
                  name="text"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <Dropdown
                    name="languageTo"
                    value={languageTo}
                    options={languageOptions}
                    onChange={handleLanguageToChange}
                    className="w-full sm:w-auto"
                  />
                  <SaveBtn
                    sourceLan={languageFrom}
                    targetLan={languageTo}
                    sourceText={inputText}
                    targetText={translatedText}
                    onHandleSave={onSave}
                    isSaved={isSaved}
                    className="w-full sm:w-auto"
                  />
                </div>
                <textarea
                  placeholder="Translated text will appear here"
                  className="border border-gray-300 rounded-md p-3 mt-2 w-full text-sm"
                  value={translatedText}
                  readOnly
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <button
                type="submit"
                className="p-3 rounded-md bg-slate-800 text-white text-sm w-full sm:w-auto"
              >
                Translate
              </button>
              {languageFrom === "en" && (
                <VoiceRecorder handleSetText={handleInputSet} />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// "use client";
// import Image from "next/image";
// import { Dropdown } from "@/app/components/dropdown";
// import { useState, useOptimistic } from "react";
// import { translate } from "@/app/actions/translate";
// import VoiceRecorder from "@/app/components/voice-recorder";
// import SaveBtn from "@/app/components/save-translation-btn";

// const languageOptions = [
//   {
//     value: "en",
//     label: "English",
//   },
//   {
//     value: "es",
//     label: "Spanish",
//   },
//   {
//     value: "fr",
//     label: "French",
//   },
//   {
//     value: "amh",
//     label: "Amharic",
//   },
// ];

// export default function Home() {
//   const [languageFrom, setLanguageFrom] = useState("en");
//   const [languageTo, setLanguageTo] = useState("es");

//   const [inputText, setInputText] = useState("");
//   const [translatedText, setTranslatedText] = useState("");
//   const [isSaved, setIsSaved] = useState(false);

//   const onSave = () => {
//     setIsSaved(true);
//   };

//   const handleLanguageFromChange = (value) => {
//     setLanguageFrom(value);
//   };

//   const handleLanguageToChange = (value) => {
//     setLanguageTo(value);
//   };

//   const handleInputChange = (e) => {
//     const newText = e.target.value;
//     setInputText(newText);
//   };

//   const handleInputSet = async (value) => {
//     setInputText(value);
//     const formData = new FormData();
//     formData.append("text", value);
//     formData.append("languageTo", languageTo);
//     formData.append("languageFrom", languageFrom);
//     const translation = await translate(formData);
//     setTranslatedText(translation.translation);
//   };

//   return (
//     <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
//           Translate with <span className="text-amber-700">Tongue</span>
//         </h1>
//         <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Break language barriers instantly with our powerful translation app.
//           Try it now!
//         </p>
//       </div>
//       <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl mx-auto">
//         <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center p-2 pb-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
//           <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
//             <form
//               className="w-full"
//               action={async (formData) => {
//                 const result = await translate(formData);
//                 setTranslatedText(result.translation);
//                 if (isSaved) {
//                   setIsSaved(false);
//                 }
//               }}
//             >
//               <div className="flex flex-row gap-4">
//                 <div className="container flex flex-col">
//                   <Dropdown
//                     name="languageFrom"
//                     value={languageFrom}
//                     options={languageOptions}
//                     onChange={handleLanguageFromChange}
//                   />
//                   <textarea
//                     placeholder="Enter text to translate"
//                     className="border border-slate-800 rounded-md p-4"
//                     value={inputText}
//                     name="text"
//                     required
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="container flex flex-col">
//                   <div className="justify-between flex">
//                     <Dropdown
//                       name="languageTo"
//                       value={languageTo}
//                       options={languageOptions}
//                       onChange={handleLanguageToChange}
//                     />
//                     <SaveBtn
//                       sourceLan={languageFrom}
//                       targetLan={languageTo}
//                       sourceText={inputText}
//                       targetText={translatedText}
//                       onHandleSave={onSave}
//                       isSaved={isSaved}
//                     />
//                   </div>
//                   <textarea
//                     placeholder="Translated text will appear here"
//                     className="border border-slate-800 rounded-md p-4"
//                     value={translatedText}
//                     readOnly
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-row items-center gap-2 h-16">
//                 <button
//                   type="submit"
//                   className="p-2  rounded-md bg-slate-800 text-white"
//                 >
//                   translate
//                 </button>
//                 {languageFrom === "en" && (
//                   <VoiceRecorder handleSetText={handleInputSet} />
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
