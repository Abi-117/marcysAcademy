
import mongoose from "mongoose";

const GoldenTalesSchema = new mongoose.Schema(
  {
    academyName: {
      type: String,
      default: "Marcys Academy of Music & Speech",
    },

    heroTitle: {
      type: String,
      default: "Golden Tales",
    },

    heroSubtitle: {
      type: String,
      default: "STORY ACADEMY",
    },

    tagline: {
      type: String,
      default: "Where Little Voices Create Magical Stories!",
    },

    highlights: {
      type: String,
      default:
        "STORYTELLING • EXPRESSION • CREATIVITY • CONFIDENCE • STAGE PERFORMANCE",
    },

    batchLabel: {
      type: String,
      default: "NEW BATCH BEGINS",
    },

    batchDate: {
      type: String,
      default: "2026-11-14T00:00:00+05:30",
    },

    benefits: {
      type: [
        {
          icon: { type: String, default: "MessageCircle" },
          text: String,
        },
      ],
      default: [
        { icon: "MessageCircle", text: "Builds Language & Communication" },
        { icon: "Mic2", text: "Improves Public Speaking Skills" },
        { icon: "Sparkles", text: "Enhances Creativity & Imagination" },
        { icon: "UsersRound", text: "Develops Confidence & Social Skills" },
        { icon: "Theater", text: "Prepares for Competitions & Stage Arts" },
      ],
    },

    modules: {
      type: [
        {
          icon: { type: String, default: "BookOpenText" },
          name: String,
          detail: String,
        },
      ],
      default: [
        {
          icon: "BookOpenText",
          name: "The Story Explorer",
          detail: "Listening & Understanding Stories",
        },
        {
          icon: "BrainCircuit",
          name: "The Imagination Lab",
          detail: "Idea Building & Creative Thinking",
        },
        {
          icon: "Mic2",
          name: "The Expression Studio",
          detail: "Voice, Tone & Storytelling Techniques",
        },
        {
          icon: "Theater",
          name: "The Character World",
          detail: "Role Play, Dramatization & Emotional Expression",
        },
        {
          icon: "Sparkles",
          name: "The Stage Storyteller",
          detail: "Performance, Presentation & Story Showcase",
        },
      ],
    },

    programs: {
      type: [
        {
          duration: String,
          sessions: String,
          detail: String,
          icon: { type: String, default: "Star" },
        },
      ],
      default: [
        {
          duration: "3 Months",
          sessions: "12 Sessions",
          detail: "Foundation in Storytelling",
          icon: "Star",
        },
        {
          duration: "6 Months",
          sessions: "24 Sessions",
          detail: "Skill Building & Creative Projects",
          icon: "Sparkles",
        },
        {
          duration: "1 Year",
          sessions: "48 Sessions",
          detail:
            "Advanced Storytelling, Performance & Certification",
          icon: "Crown",
        },
      ],
    },

    childrensDayTitle: {
      type: String,
      default: "Gift Your Child this Children's Day...",
    },

    childrensDaySubtitle: {
      type: String,
      default: "A Journey into Stories, Creativity and Confidence!",
    },

    locationTitle: {
      type: String,
      default: "Offline at Kilpauk, Chennai",
    },

    contactText: {
      type: String,
      default: "To Enroll or Know More, Contact:",
    },

    phone: {
      type: String,
      default: "9840198348",
    },
  },
  { timestamps: true }
);

export default mongoose.models.GoldenTales ||
  mongoose.model("GoldenTales", GoldenTalesSchema);
