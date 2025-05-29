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
        <li>Add fake data for now (just to play with tags)</li>
        <li>Add more images and sort out thumbnails </li>
      </ol>
    </main>
  );
}
