import {
  memo,
  useEffect,
  useRef,
} from "react";

import "./FAQSection.css";

const FAQ_ITEMS = [
  {
    enQuestion: "What services do you provide?",
    bnQuestion: "আপনারা কী কী সেবা প্রদান করেন?",
    enAnswer:
      "We build mobile applications, web platforms, backend and API systems, management software, and connected digital solutions based on business needs.",
    bnAnswer:
      "আমরা ব্যবসার প্রয়োজন অনুযায়ী মোবাইল অ্যাপ্লিকেশন, ওয়েব প্ল্যাটফর্ম, ব্যাকএন্ড ও API সিস্টেম, ম্যানেজমেন্ট সফটওয়্যার এবং সংযুক্ত ডিজিটাল সলিউশন তৈরি করি।",
  },
  {
    enQuestion: "Do you build fully custom software?",
    bnQuestion: "আপনারা কি সম্পূর্ণ কাস্টম সফটওয়্যার তৈরি করেন?",
    enAnswer:
      "Yes. We can design and develop a solution around your workflow, requirements, users, and long-term business goals.",
    bnAnswer:
      "হ্যাঁ। আপনার কাজের ধরণ, প্রয়োজন, ব্যবহারকারী এবং দীর্ঘমেয়াদি ব্যবসায়িক লক্ষ্য অনুযায়ী আমরা কাস্টম সলিউশন ডিজাইন ও ডেভেলপ করতে পারি।",
  },
  {
    enQuestion: "Can you work on an existing project?",
    bnQuestion: "আগে থেকে তৈরি কোনো প্রজেক্টে কি কাজ করতে পারবেন?",
    enAnswer:
      "Yes. We can review an existing project and, where appropriate, improve, extend, maintain, or continue its development.",
    bnAnswer:
      "হ্যাঁ। আমরা আগে থেকে তৈরি প্রজেক্ট পর্যালোচনা করে প্রয়োজন অনুযায়ী সেটি উন্নত, সম্প্রসারণ, রক্ষণাবেক্ষণ অথবা পরবর্তী ডেভেলপমেন্ট চালিয়ে যেতে পারি।",
  },
  {
    enQuestion: "How long does a project take?",
    bnQuestion: "একটি প্রজেক্ট সম্পন্ন করতে কত সময় লাগে?",
    enAnswer:
      "The timeline depends on the project scope, features, integrations, design requirements, and testing needs. We discuss the expected timeline before development begins.",
    bnAnswer:
      "সময়সীমা নির্ভর করে প্রজেক্টের পরিধি, ফিচার, ইন্টিগ্রেশন, ডিজাইন এবং টেস্টিংয়ের প্রয়োজনের ওপর। ডেভেলপমেন্ট শুরুর আগে আমরা সম্ভাব্য সময়সীমা আলোচনা করি।",
  },
  {
    enQuestion: "How is project pricing decided?",
    bnQuestion: "প্রজেক্টের মূল্য কীভাবে নির্ধারণ করা হয়?",
    enAnswer:
      "Pricing is based on the actual scope and technical requirements. You can choose one of our listed packages or contact us for a custom quote.",
    bnAnswer:
      "প্রজেক্টের কাজের পরিধি ও টেকনিক্যাল প্রয়োজন অনুযায়ী মূল্য নির্ধারণ করা হয়। আপনি আমাদের প্রস্তুত প্যাকেজ বেছে নিতে পারেন অথবা কাস্টম কোটের জন্য যোগাযোগ করতে পারেন।",
  },
  {
    enQuestion: "Do you provide support after launch?",
    bnQuestion: "প্রজেক্ট চালুর পর কি সাপোর্ট পাওয়া যাবে?",
    enAnswer:
      "Support and maintenance can be arranged based on the needs of the project, including fixes, updates, and future improvements.",
    bnAnswer:
      "প্রজেক্টের প্রয়োজন অনুযায়ী পরবর্তী সাপোর্ট ও মেইনটেন্যান্সের ব্যবস্থা করা যায়, যার মধ্যে সমস্যা সমাধান, আপডেট এবং ভবিষ্যৎ উন্নয়ন অন্তর্ভুক্ত থাকতে পারে।",
  },
];

function FAQSectionComponent({
  lang = "en",
}) {
  const isBn = lang === "bn";
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const heading =
      section.querySelector(
        ".mollick-faq__heading"
      );

    const items = Array.from(
      section.querySelectorAll(
        ".mollick-faq__item"
      )
    );

    const targets = [
      ...(heading ? [heading] : []),
      ...items,
    ];

    if (!targets.length) {
      return undefined;
    }

    targets.forEach(
      (element, index) => {
        element.dataset.reveal =
          index === 0
            ? "text"
            : "visual";

        if (index > 0) {
          element.dataset.revealDelay =
            String(index * 180);
        }

        element.classList.remove(
          "is-revealed"
        );
      }
    );

    if (
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      targets.forEach(
        (element) =>
          element.classList.add(
            "is-revealed"
          )
      );

      return undefined;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const delay = Number(
                entry.target.dataset
                  .revealDelay || 0
              );

              window.setTimeout(
                () => {
                  entry.target.classList.add(
                    "is-revealed"
                  );
                },
                delay
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -10% 0px",
        }
      );

    targets.forEach(
      (element) =>
        observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mollick-faq"
      id="faq"
      aria-labelledby="mollick-faq-title"
    >
      <div className="mollick-faq__inner">
        <header className="mollick-faq__heading">
          <span>
            {isBn
              ? "প্রশ্নোত্তর"
              : "FAQ"}
          </span>

          <h2 id="mollick-faq-title">
            {isBn
              ? "সাধারণ কিছু প্রশ্নের উত্তর"
              : "Frequently Asked Questions"}
          </h2>

          <p>
            {isBn
              ? "আমাদের সেবা, প্রজেক্ট, মূল্য এবং সাপোর্ট সম্পর্কে সাধারণ কিছু প্রশ্নের উত্তর।"
              : "Answers to common questions about our services, projects, pricing, and support."}
          </p>
        </header>

        <div className="mollick-faq__list">
          {FAQ_ITEMS.map(
            (item, index) => (
              <details
                className="mollick-faq__item"
                key={item.enQuestion}
              >
                <summary>
                  <span className="mollick-faq__number">
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {isBn
                      ? item.bnQuestion
                      : item.enQuestion}
                  </strong>

                  <span
                    className="mollick-faq__plus"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>

                <div className="mollick-faq__answer">
                  <p>
                    {isBn
                      ? item.bnAnswer
                      : item.enAnswer}
                  </p>
                </div>
              </details>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export const FAQSection =
  memo(FAQSectionComponent);
