import { useState } from "react";
import {
  FaEnvelope,
  FaCommentDots,
  FaBug,
  FaArrowRight,
  FaRegNewspaper,
  FaBookmark,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";

const topics = [
  {
    title: "General queries",
    description: "Questions about NewsHub and how it works.",
    icon: FaEnvelope,
    subject: "General query",
  },
  {
    title: "Share feedback",
    description: "Ideas that could make the experience better.",
    icon: FaCommentDots,
    subject: "Feedback",
  },
  {
    title: "Report an issue",
    description: "Let us know if something is not working right.",
    icon: FaBug,
    subject: "Report an issue",
  },
];
const faqs = [
  {
    question: "Why is an article unavailable?",
    answer:
      "The publisher may have removed the story, changed its link, or limited access. NewsHub links to stories hosted by their original publishers.",
  },
  {
    question: "How do bookmarks work?",
    answer:
      "Bookmarks are saved in this browser. Open the Bookmarks page on this device to find them later.",
  },
  {
    question: "Where does the news come from?",
    answer:
      "NewsHub requests article listings through the configured GNews API and links to the original publisher for the full story.",
  },
];
const initialForm = { name: "", email: "", subject: "", message: "" };
function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Add a subject.";
    if (!form.message.trim()) nextErrors.message = "Write a message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Please check the highlighted fields.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/sagarsupport1@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            subject: form.subject.trim(),
            message: form.message.trim(),
            _subject: `NewsHub contact: ${form.subject.trim()}`,
            _template: "table",
            _honey: "",
          }),
        },
      );
      const result = await response.json();
      if (!response.ok || result.success === false)
        throw new Error("Message delivery failed");
      setForm(initialForm);
      setSubmitted(true);
      toast.success("Your message has been received.");
    } catch {
      toast.error("We could not send your message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  const fieldClass = (name) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 ${errors[name] ? "border-red-500" : "border-gray-200"}`;

  return (
    <main className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
      <section className="rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 px-7 py-12 text-white md:px-12 md:py-16">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-red-200">
          Contact NewsHub
        </p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
          We’d love to hear from you.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
          Questions, feedback or something to report? Choose a topic or send a
          note using the form below.
        </p>
      </section>

      <section
        className="-mt-5 grid gap-4 px-2 md:grid-cols-3"
        aria-label="Contact topics"
      >
        {topics.map(({ title, description, icon: Icon, subject }) => (
          <button
            key={title}
            type="button"
            onClick={() => {
              setForm((current) => ({ ...current, subject }));
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-lg shadow-gray-900/5 transition hover:-translate-y-1"
          >
            <span className="inline-flex rounded-xl bg-red-50 p-3 text-lg text-red-700">
              <Icon />
            </span>
            <h2 className="mt-4 font-bold text-gray-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">
              {description}
            </p>
          </button>
        ))}
      </section>

      <section className="grid gap-9 py-12 lg:grid-cols-[1.15fr_.85fr]">
        <div
          id="contact-form"
          className="rounded-3xl border border-gray-200 bg-white p-6 md:p-9"
        >
          <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
            Send a message
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">
            We’ll be glad to hear from you
          </h2>
          {submitted && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-800"
            >
              Your message has been Sended.
            </p>
          )}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700">
                Name
                <input
                  className={fieldClass("name")}
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span
                    id="name-error"
                    className="mt-1 block font-normal text-red-700"
                  >
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="text-sm font-semibold text-gray-700">
                Email
                <input
                  className={fieldClass("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="mt-1 block font-normal text-red-700"
                  >
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            <label className="block text-sm font-semibold text-gray-700">
              Subject
              <input
                className={fieldClass("subject")}
                name="subject"
                value={form.subject}
                onChange={update}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="What is this about?"
              />
              {errors.subject && (
                <span
                  id="subject-error"
                  className="mt-1 block font-normal text-red-700"
                >
                  {errors.subject}
                </span>
              )}
            </label>
            <label className="block text-sm font-semibold text-gray-700">
              Message
              <textarea
                className={`${fieldClass("message")} min-h-36 resize-y`}
                name="message"
                value={form.message}
                onChange={update}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Write your message here..."
              />
              {errors.message && (
                <span
                  id="message-error"
                  className="mt-1 block font-normal text-red-700"
                >
                  {errors.message}
                </span>
              )}
            </label>
            <button
              className="inline-flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
            >
              {isSending ? "Sending..." : "Send message"} <FaArrowRight />
            </button>
            <p className="max-w-xl text-xs leading-5 text-gray-600">
              Your details are sent through FormSubmit to deliver this message.
              Read its{" "}
              <a
                href="https://formsubmit.co/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-700 underline underline-offset-2"
              >
                privacy policy
              </a>{" "}
              before sending sensitive information.
            </p>
          </form>
        </div>

        <aside>
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-red-700">
              Quick answers
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-950">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {faqs.map(({ question, answer }, index) => {
              const Icon = [FaRegNewspaper, FaBookmark, FaGlobe][index];
              return (
                <details
                  key={question}
                  className="group rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3 font-semibold text-gray-950">
                    <Icon className="mt-1 shrink-0 text-red-700" />
                    <span className="flex-1">{question}</span>
                    <span
                      aria-hidden="true"
                      className="text-xl text-gray-400 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pl-7 pt-3 leading-7 text-gray-700">{answer}</p>
                </details>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-gray-50 p-5">
            <h3 className="font-bold text-gray-950">About email delivery</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              This form uses FormSubmit as an email delivery provider.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
export default Contact;
