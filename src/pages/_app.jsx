import RifasProvider from "@/common/Rifas";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/tickets.png" type="image/x-icon" />
        <title>Rifa de Casamento</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
                body{
                    margin: 0;
                    list-style:none;
                    font-family: 'Roboto Serif', serif;
                    overflow: overlay;
                    background-color: #9DC08B;
                }
                ::-webkit-scrollbar{
                    width: 3px;
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb{
                    background-color: rgba(255, 255, 255, 0.5);
                }
                *{
                  margin: 0;
                  padding: 0;
                }
            `}</style>
      <AnimatePresence>
        <RifasProvider>
          <Component {...pageProps} />
        </RifasProvider>
      </AnimatePresence>
    </>
  )
}