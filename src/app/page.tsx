export default async function HomePage() {
  return (
    <main>
      <h1>Welcome to My Personal Site</h1>
      <h2>Todo list</h2>
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li>Set up contentful: ✅ </li>
        <li>pull down from contentful ✅</li>
        <li>Sort out page structure ✅</li>
        <li>Start on sorting styling/fonts (global css for general tags)✅ </li>
        <li>Add fake data for now (just to play with tags)✅</li>
        <li>Add more images ✅</li>
        <li>Add job details in contentful ✅</li>
        <li>Add all job details in contentful ✅</li>
        <li>Add job zod type ✅</li>
        <li>Extract job entry component out </li>
        <li>Clean up tailwind classes per already sorted page</li>
        <li>Get feedback on metadata/SEO and semantic for Artwork stuff</li>
        <li>Get feedback on metadata/SEO and semantic for Career stuff</li>
        <li>Sort Artwork page out (single carousel) ✅</li>
        <li>Update Artwork content with meaningful data</li>
        <li>Find effective home for contentful createClient ✅</li>
        <li>Actually deploy - sort out prod envs ✅</li>
        <li>Sort thumbnails/ or remove? </li>
      </ol>
    </main>
  );
}
