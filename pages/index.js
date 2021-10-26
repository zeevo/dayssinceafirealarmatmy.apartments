import { useState, useEffect } from "react";
import Head from "next/head";
import { DateTime } from "luxon";
import { getDayInformation } from "../lib/getDayInformation";

export default function Home({ dayInformation }) {
  const now = DateTime.now();
  const latest = DateTime.fromISO(
    dayInformation[dayInformation.length - 1].date
  );

  const { days, seconds } = now.diff(latest, ["days", "seconds"]).toObject();

  const [secondsState, setSeconds] = useState(seconds);

  const hoursSince = Math.floor(secondsState / 3600);
  const minutesSince = Math.floor((secondsState % 3600) / 60);

  const updateSeconds = () => {
    setSeconds((seconds) => seconds + 1);
  };

  useEffect(() => {
    const interval = setInterval(updateSeconds, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white bg-soft-black">
      <Head>
        <title>Days Since A Fire Alaram At MyApartments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <div className="flex flex-col justify-center flex-1 align-center">
          <h1 className="text-6xl font-bold text-center lg:mx-60">
            Days Since My Apartment Building Has Had A Fire Alarm
          </h1>
          <h2 className="mt-5 font-extrabold text-center text-transparent text-9xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            {Math.floor(days)}
          </h2>
          <h3 className="mt-5 text-xl text-center">
            It has been {days} Days, {hoursSince} Hours, {minutesSince} Minutes,
            and {Math.floor(secondsState % 60)} Seconds since there was a fire
            alarm at my apartment building.
          </h3>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24">
        <a
          className="flex items-center justify-center text-xl"
          href="https://zeevo.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by {"  "}
          <span className="ml-1 font-bold text-blue-600">zeevo.io</span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      dayInformation: getDayInformation(),
    },
  };
};
