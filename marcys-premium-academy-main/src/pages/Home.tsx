
import { useEffect, useState } from "react";
import {
  BookOpenText,
  BrainCircuit,
  MessageCircle,
  Mic2,
  Sparkles,
  Theater,
  UsersRound,
  BookOpen,
  CalendarDays,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  Crown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import goldenBackground from "@/assets/image.png";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: MessageCircle,
    text: "Builds Language & Communication",
  },
  {
    icon: Mic2,
    text: "Improves Public Speaking Skills",
  },
  {
    icon: Sparkles,
    text: "Enhances Creativity & Imagination",
  },
  {
    icon: UsersRound,
    text: "Develops Confidence & Social Skills",
  },
  {
    icon: Theater,
    text: "Prepares for Competitions & Stage Arts",
  },
];

const modules = [
  {
    icon: BookOpenText,
    name: "The Story Explorer",
    detail: "Listening & Understanding Stories",
  },
  {
    icon: BrainCircuit,
    name: "The Imagination Lab",
    detail: "Idea Building & Creative Thinking",
  },
  {
    icon: Mic2,
    name: "The Expression Studio",
    detail: "Voice, Tone & Storytelling Techniques",
  },
  {
    icon: Theater,
    name: "The Character World",
    detail: "Role Play, Dramatization & Emotional Expression",
  },
  {
    icon: Sparkles,
    name: "The Stage Storyteller",
    detail: "Performance, Presentation & Story Showcase",
  },
];

const programs = [
  {
    duration: "3 Months",
    sessions: "12 Sessions",
    detail: "Foundation in Storytelling",
    icon: Star,
  },
  {
    duration: "6 Months",
    sessions: "24 Sessions",
    detail: "Skill Building & Creative Projects",
    icon: Sparkles,
  },
  {
    duration: "1 Year",
    sessions: "48 Sessions",
    detail: "Advanced Storytelling, Performance & Certification",
    icon: Crown,
  },
];

const targetDate = new Date("2026-11-14T00:00:00+05:30").getTime();

const Home = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    started: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          started: true,
        });
        return;
      }

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
        started: false,
      });
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  const handleBookNow = () => {
    window.location.href = "tel:9840198348";
  };

  
return (
  <main className="min-h-screen overflow-hidden bg-[#100700] text-white">

    {/* =========================================
        SECTION 1 - GOLDEN TALES HERO BANNER
    ========================================= */}

      
{/* GOLDEN TALES HERO BANNER */}


<section className="relative isolate mt-6 w-full min-h-[950px] overflow-hidden bg-[#160900] sm:min-h-[850px] lg:min-h-[768px]">
  {/* Background Image - NO CHANGES */}

  {/* RESPONSIVE BACKGROUND IMAGE */}

<img
  src={goldenBackground}
  alt="Golden Tales princess and children"
  className="
    absolute inset-0 z-0
    h-full w-full
    object-cover
    md:object-fill
  "
/>

  {/* Soft Dark Overlay - NO CHANGES */}

  <div className="absolute inset-0 z-[1] bg-black/35" />

  {/* Banner Content */}

  <div className="relative z-10 mx-auto flex min-h-[950px] max-w-[1500px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[900px] sm:px-8 lg:min-h-[850px] lg:py-16">

    {/* Crown */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Crown className="mb-2 h-9 w-9 text-yellow-400 sm:h-12 sm:w-12" />
    </motion.div>

    {/* Academy Name */}

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <p className="font-serif text-base font-bold text-white sm:text-xl md:text-2xl">
        Marcys Academy of Music & Speech
      </p>

      <p className="mt-2 font-serif text-sm text-yellow-200 sm:text-lg">
        Presents
      </p>
    </motion.div>

    {/* Golden Tales Heading */}

    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="mt-2 font-serif text-5xl font-black italic leading-tight text-transparent sm:text-7xl lg:text-8xl"
      style={{
        backgroundImage:
          "linear-gradient(180deg,#fff6ad,#ffc928,#d98700)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        filter: "drop-shadow(0 4px 15px rgba(255,174,0,.5))",
      }}
    >
      Golden Tales
    </motion.h1>

    {/* Story Academy */}

    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-1 font-serif text-xl font-bold tracking-[0.25em] text-white sm:text-3xl"
    >
      STORY ACADEMY
    </motion.h2>

    {/* Tagline */}

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-4 rounded-full border border-yellow-400 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 px-5 py-2 shadow-lg sm:px-10 sm:py-3"
    >
      <p className="font-serif text-sm font-bold italic text-black sm:text-xl">
        Where Little Voices Create Magical Stories!
      </p>
    </motion.div>

    {/* Highlights */}

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mt-5 text-[10px] font-bold tracking-widest text-yellow-100 sm:text-sm md:text-base"
    >
      STORYTELLING <span className="mx-1 text-yellow-400">•</span>
      EXPRESSION <span className="mx-1 text-yellow-400">•</span>
      CREATIVITY <span className="mx-1 text-yellow-400">•</span>
      CONFIDENCE <span className="mx-1 text-yellow-400">•</span>
      STAGE PERFORMANCE
    </motion.p>

    {/* Batch Date */}

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-7"
    >
      <p className="font-serif text-base font-bold text-yellow-100 sm:text-2xl">
        NEW BATCH BEGINS
      </p>

      <h2
        className="mt-1 font-serif text-4xl font-black italic sm:text-6xl lg:text-7xl"
        style={{
          color: "#ffcf39",
          textShadow: "0 0 20px rgba(255,180,0,.7)",
        }}
      >
        14th November
      </h2>
    </motion.div>

    {/* Countdown */}

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="mt-6 w-full max-w-[520px] rounded-xl border border-yellow-400/80 bg-black/80 p-3 shadow-lg sm:p-4"
    >
      {countdown.started ? (
        <p
          aria-live="polite"
          className="py-3 font-serif text-xl font-black text-yellow-400 sm:text-3xl"
        >
          NEW BATCH STARTED!
        </p>
      ) : (
        <>
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-yellow-300 sm:text-sm">
            BATCH STARTS IN
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeUnits.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-yellow-400/70 bg-[#261400] px-1 py-2 sm:py-3"
              >
                <p className="font-serif text-2xl font-black tabular-nums text-yellow-300 sm:text-4xl">
                  {String(value).padStart(2, "0")}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-white sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>

    {/* Book Now */}

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-6"
    >
      <Button
        onClick={handleBookNow}
        size="lg"
        className="golden-cta h-12 rounded-full border-2 border-yellow-300 bg-gradient-to-r from-red-800 via-red-600 to-red-800 px-10 text-lg font-black tracking-wider text-white shadow-lg transition-colors duration-300 hover:from-red-600 hover:to-red-700 sm:h-14 sm:px-16 sm:text-2xl"
      >
        BOOK NOW
        <ArrowRight className="ml-3 h-6 w-6" />
      </Button>
    </motion.div>

  </div>
</section>




    {/* =========================================
        SECTION 2 - PROGRAM DETAILS
    ========================================= */}

    <section className="relative bg-gradient-to-b from-[#180b00] via-[#100700] to-black px-4 py-14 sm:px-8 sm:py-20">

      <div className="mx-auto max-w-7xl">

        {/* Children's Day Message */}

        <div className="mb-12 text-center">

          <p className="font-serif text-2xl font-bold italic text-yellow-400 sm:text-4xl">
            Gift Your Child this Children's Day...
          </p>

          <p className="mt-3 text-sm text-yellow-100 sm:text-lg">
            A Journey into Stories, Creativity and Confidence!
          </p>

          <p className="mt-4 text-xs font-semibold tracking-widest text-yellow-300 sm:text-sm">
            STORYTELLING • EXPRESSION • CREATIVITY • CONFIDENCE • STAGE PERFORMANCE
          </p>

        </div>


        {/* Benefits */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

          {benefits.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="rounded-xl border border-yellow-500/40 bg-[#1b1005] p-5 text-center transition hover:border-yellow-300 hover:shadow-lg"
            >
              <Icon className="mx-auto mb-4 h-9 w-9 text-yellow-400" />

              <p className="text-xs font-semibold leading-relaxed text-white sm:text-sm">
                {text}
              </p>
            </div>
          ))}

        </div>


        {/* Program Modules */}

        <div className="mt-16">

          <h2 className="text-center font-serif text-3xl font-bold text-yellow-400 sm:text-4xl">
            Program Modules
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {modules.map(({ icon: Icon, name, detail }, index) => (
              <div
                key={name}
                className="flex items-start gap-4 rounded-xl border border-yellow-500/30 bg-[#1b1005] p-5"
              >
                <div className="rounded-full bg-yellow-400/10 p-3">
                  <Icon className="h-6 w-6 text-yellow-400" />
                </div>

                <div>
                  <p className="text-xs font-bold text-yellow-500">
                    MODULE 0{index + 1}
                  </p>

                  <h3 className="mt-1 font-serif text-lg font-bold text-white">
                    {name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-yellow-100/80">
                    {detail}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>


        {/* Program Duration */}

        <div className="mt-16">

          <h2 className="text-center font-serif text-3xl font-bold text-yellow-400 sm:text-4xl">
            Program Duration & Options
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {programs.map(({ duration, sessions, detail, icon: Icon }) => (
              <div
                key={duration}
                className="rounded-2xl border border-yellow-400/50 bg-gradient-to-b from-[#35200a] to-[#150a00] p-7 text-center shadow-xl"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-yellow-400" />

                <h3 className="font-serif text-2xl font-black text-yellow-300">
                  {duration}
                </h3>

                <p className="mt-2 text-lg font-bold text-white">
                  {sessions}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-yellow-100/80">
                  {detail}
                </p>
              </div>
            ))}

          </div>
        </div>


        {/* Location & Contact */}

        <div className="mt-16 rounded-2xl border border-yellow-400/50 bg-[#211200] px-5 py-10 text-center">

          <MapPin className="mx-auto mb-3 h-10 w-10 text-yellow-400" />

          <h2 className="font-serif text-2xl font-bold text-yellow-300 sm:text-3xl">
            Offline at Kilpauk, Chennai
          </h2>

          <p className="mt-4 text-sm text-yellow-100">
            To Enroll or Know More, Contact:
          </p>

          <a
            href="tel:9840198348"
            className="mt-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 px-8 py-4 text-xl font-black text-black transition hover:scale-105"
          >
            <Phone className="h-6 w-6" />
            98401 98348
          </a>

          <div className="mt-8">
            <Button
              onClick={handleBookNow}
              className="rounded-full border border-yellow-300 bg-red-700 px-10 py-6 text-lg font-bold text-white hover:bg-red-600"
            >
              BOOK NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

        </div>

      </div>
    </section>

  </main>
);

};

export default Home;
