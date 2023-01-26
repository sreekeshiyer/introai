import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-center items-center w-full flex-col mb-12">
            <Link href="/" className="flex items-center">
                <Image
                    alt="logo"
                    src="/logo.png"
                    className="sm:w-52 sm:h-52 w-32 h-32 my-4"
                    width={500}
                    height={500}
                />
            </Link>
            <h1 className="text-[0.9rem] font-light text-slate-300">
                Powered by{" "}
                <a
                    href="https://openai.com/"
                    rel="noreferrer"
                    target="_blank"
                    className="font-semibold hover:border-slate-300 hover:border-b-[1px] text-white"
                >
                    OpenAI
                </a>
            </h1>
        </header>
    );
}
