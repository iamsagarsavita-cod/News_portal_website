import {
  FaBullseye,
  FaGlobe,
  FaBriefcase,
  FaMicrochip,
  FaFutbol,
  FaHeart,
  FaFilm,
  FaFilter,
  FaBookmark,
  FaCheckCircle,
  FaEye,
  FaUniversalAccess,
  FaBolt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const coverage = [
  { label: "World", icon: FaGlobe },
  { label: "Business", icon: FaBriefcase },
  { label: "Technology", icon: FaMicrochip },
  { label: "Sports", icon: FaFutbol },
  { label: "Health", icon: FaHeart },
  { label: "Entertainment", icon: FaFilm },
];
const features = [
  {
    title: "Curated headlines",
    text: "A focused stream of current stories to help you catch up quickly.",
    icon: FaCheckCircle,
  },
  {
    title: "Explore your way",
    text: "Filter by category, country and language, or search for a topic.",
    icon: FaFilter,
  },
  {
    title: "Save for later",
    text: "Bookmark articles in this browser and return to them any time.",
    icon: FaBookmark,
  },
];
const values = [
  {
    title: "Accuracy",
    text: "Find reporting from publishers and check the original story.",
    icon: FaBullseye,
  },
  {
    title: "Transparency",
    text: "Publisher and publication date are shown when provided by the news API.",
    icon: FaEye,
  },
  {
    title: "Accessibility",
    text: "A straightforward experience across desktop and mobile.",
    icon: FaUniversalAccess,
  },
];
function About() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
      <section className="rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 px-7 py-12 text-white md:px-14 md:py-16">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-red-200">
          <FaBolt /> A clearer way to catch up
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          NewsHub — News that matters
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          A trusted, fast and simple news experience that helps you stay
          informed and make sense of what is happening around you.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-red-700 transition hover:bg-gray-100"
        >
          Explore the latest news
        </Link>
      </section>

      <section className="grid gap-8 py-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
            Our mission
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 md:text-4xl">
            The important stories, made easier to find.
          </h2>
        </div>
        <p className="text-lg leading-8 text-gray-700">
          News moves quickly. NewsHub brings headlines and topic discovery into
          one straightforward place, so you can spend less time looking and more
          time understanding. Choose what matters to you, then follow the story
          to its source.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-7 md:p-10">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
            What we cover
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            A world of perspectives
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {coverage.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-3 py-6 text-center shadow-sm"
            >
              <Icon className="text-2xl text-red-700" />
              <span className="font-semibold text-gray-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
            Why NewsHub
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            Your news, your way
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <span className="inline-flex rounded-xl bg-red-50 p-3 text-xl text-red-700">
                <Icon />
              </span>
              <h3 className="mt-5 text-xl font-bold text-gray-950">{title}</h3>
              <p className="mt-2 leading-7 text-gray-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gray-950 p-7 text-white md:p-10">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-red-300">
          Our values
        </p>
        <div className="mt-6 grid gap-7 md:grid-cols-3">
          {values.map(({ title, text, icon: Icon }) => (
            <article key={title}>
              <Icon className="text-2xl text-red-300" />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-gray-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-14 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950">
            From headlines to your reading list
          </h2>
          <p className="mt-4 leading-7 text-gray-700">
            NewsHub requests articles from the GNews API when you load the feed
            or change filters. There is no background refresh. Explore with
            search and category filters, choose country and language options,
            then save stories to your bookmarks.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-red-100 text-xl font-bold text-red-800">
              S
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Created by
              </p>
              <h3 className="text-xl font-bold text-gray-950">Sagar Savita</h3>
            </div>
          </div>
          <p className="mt-5 leading-7 text-gray-700">
            Built with care to make discovering and saving news feel simple.
          </p>
        </div>
      </section>
    </main>
  );
}
export default About;
