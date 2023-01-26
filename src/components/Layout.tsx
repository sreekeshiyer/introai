import Head from "next/head";
import { ReactNode } from "react";
import { keywords, content, og_title, og_image, author } from "@/helpers/seo";

type Props = {
    title: string;
    children: ReactNode;
};

const Layout = ({ title, children }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content="IntroAI - Free AI Generated Introductions for your Interviews, Tweets, LinkedIn Abouts and more!"
                />
                <meta property="og:title" content={og_title} />
                <meta property="og:description" content={content} />
                <meta property="og:image" content={og_image} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-gray-900 text-white">
                <div className="flex max-w-6xl mx-auto flex-col items-center justify-center min-h-screen py-2">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
