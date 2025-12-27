import React from "react";

export default function DocsRenderer({ content }) {
  return (
    <article className="space-y-xl">
      {content.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold mb-md">
            {section.title}
          </h2>

          <ul className="list-disc ml-lg space-y-sm text-secondary">
            {section.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
