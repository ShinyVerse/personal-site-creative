import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me - Laura Jackson",
  description: "Learn more about Laura Jackson, her background and interests",
};

export default function AboutPage() {
  return (
    <main>
      <h1>About Me</h1>

      <section>
        <h2>General Summary</h2>
        <p>A brief overview about yourself.</p>
      </section>

      <section>
        <h2>Interests</h2>
        <ul>
          <li>Interest One</li>
          <li>Interest Two</li>
          <li>Interest Three</li>
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <p>Highlight relevant skills or expertise.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>How people can reach you.</p>
      </section>
    </main>
  );
}
