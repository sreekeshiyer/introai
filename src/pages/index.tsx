import type { NextPage } from "next";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { finalPrompt, findQuote } from "@/helpers/prompts";
import ReactMarkdown from "react-markdown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import ResizablePanel from "@/components/ResizablePanel";
import Layout from "@/components/Layout";

const Home: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [intro, setIntro] = useState("");
    const [vibe, setVibe] = useState<string>("Professional");
    const [platform, setPlatform] = useState<string>("Technical Interview");
    const [generatedIntros, setGeneratedIntros] = useState<string>("");
    const [quote, setQuote] = useState<string>("");

    const options = ["Professional", "Funny", "Casual"];
    const platforms = [
        "Technical Interview",
        "General Interview",
        "LinkedIn About",
        "Tweet",
        "Twitter Bio",
    ];

    const generateIntro = async (e: any) => {
        e.preventDefault();
        setGeneratedIntros("");
        setQuote("");
        setLoading(true);

        intro.length < 5 &&
            toast(
                "We didn't receive enough input, so we applied some of our 🧠"
            );
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: finalPrompt(vibe, platform, intro),
            }),
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        // Readable stream response
        const data = res.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setGeneratedIntros((prev) => prev + chunkValue);
        }
        setQuote(findQuote(platform));
        setLoading(false);
    };

    return (
        <Layout title="IntroAI">
            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
                <h1 className="sm:text-6xl text-4xl max-w-3xl font-bold">
                    Let AI introduce you!
                </h1>
                <div className="my-6"></div>
                <div className="max-w-xl">
                    <div className="bg-gray-900 rounded-md p-2 w-full">
                        <label
                            htmlFor={intro}
                            className="block text-white font-medium mt-4 mb-6 text-left"
                        >
                            Share a few words about yourself
                            <h1 className="text-slate-400 text-[0.9rem] font-normal">
                                Describe your skills, strengths and
                                achievements!
                            </h1>
                        </label>
                        <textarea
                            id={intro}
                            name={intro}
                            className="bg-gray-800 rounded-md p-3 text-white focus:outline-none focus:shadow-outline-blue w-full h-40"
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </div>
                    <div className="bg-gray-900 rounded-md p-2 w-full">
                        <label
                            htmlFor={vibe}
                            className="block text-white font-medium mt-4 mb-6 text-left"
                        >
                            Pick your style
                            <h1 className="text-slate-400 text-[0.9rem] font-normal">
                                Specify the tone of the description based on
                                your interests or requirements
                            </h1>
                        </label>
                        <select
                            id={vibe}
                            value={vibe}
                            onChange={(e) => setVibe(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="bg-gray-900 rounded-md p-2 w-full">
                        <label
                            htmlFor={platform}
                            className="block text-white font-medium mt-4 mb-6 text-left"
                        >
                            Choose the right platform
                            <h1 className="text-slate-400 text-[0.9rem] font-normal">
                                This is important to decide the length, use of
                                the right keywords, etc.
                            </h1>
                        </label>
                        <select
                            id={platform}
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        >
                            {platforms.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {!loading && (
                        <button
                            className="bg-white rounded-xl text-gray-900 font-medium p-4 sm:mt-10 mt-8 hover:bg-gray-200 w-full transition-all duration-300"
                            onClick={generateIntro}
                        >
                            Introduce me!
                        </button>
                    )}
                    {loading && (
                        <button
                            className="bg-white rounded-xl text-gray-900 font-medium p-4 sm:mt-10 mt-8 hover:bg-gray-200 w-full"
                            disabled
                        >
                            <Loader />
                        </button>
                    )}
                </div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 2000,
                        style: {
                            background: "rgb(55,65,81)",
                            color: "#fff",
                        },
                    }}
                />
                <ResizablePanel>
                    <AnimatePresence mode="wait">
                        <motion.div className="space-y-10 my-10 max-w-6xl items-center flex flex-col">
                            {generatedIntros && (
                                <>
                                    <div>
                                        <h2 className="sm:text-5xl text-4xl font-bold text-white mx-auto border-t pt-6">
                                            Your Results
                                        </h2>
                                    </div>
                                    {quote !== "" && (
                                        <div className="font-normal text-slate-300 text-[0.9rem] flex gap-2 items-end">
                                            <span className="text-4xl">“</span>
                                            <ReactMarkdown>
                                                {quote}
                                            </ReactMarkdown>
                                        </div>
                                    )}

                                    <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                                        {generatedIntros
                                            .substring(
                                                generatedIntros.indexOf("1") + 3
                                            )
                                            .split("2.")

                                            .map((generatedIntro) => {
                                                return (
                                                    <div
                                                        className="bg-gray-700 rounded-xl shadow-md p-4 hover:bg-gray-600 transition cursor-copy border"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                generatedIntro
                                                            );
                                                            toast(
                                                                "Bio copied to clipboard",
                                                                {
                                                                    icon: "📋",
                                                                }
                                                            );
                                                        }}
                                                        key={generatedIntro}
                                                    >
                                                        <ReactMarkdown>
                                                            {generatedIntro}
                                                        </ReactMarkdown>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
            <Footer />
        </Layout>
    );
};

export default Home;
