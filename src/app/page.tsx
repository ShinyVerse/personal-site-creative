import { BreedCollectionSchema } from "@/lib/cats";

export default async function Page({
  searchParams: searchParamsPromise,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await searchParamsPromise;
  const page = Number(searchParams?.page) || 1;

  const res = await fetch(`https://catfact.ninja/breeds?page=${page}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} - ${text}`);
  }

  const data = await res.json();

  // Validate with Zod
  const cats = BreedCollectionSchema.parse(data.data);

  const { current_page, last_page } = data;
  const currentPage = Number(current_page);
  const lastPage = Number(last_page);

  return (
    <main>
      {cats.map((kitty) => (
        <li key={kitty.breed}>
          {kitty.breed} — {kitty.origin}
        </li>
      ))}
      <nav>
        {currentPage > 1 && <a href={`?page=${currentPage - 1}`}>Previous</a>}
        {/* Add Next button conditionally if needed */}
        {lastPage !== currentPage && (
          <a href={`?page=${current_page + 1}`}>Next</a>
        )}
      </nav>
      <h1>Welcome to My Personal Site</h1>
      <h2>Todo list</h2>
      <ol
        reversed
        className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]"
      >
        <li>Play with experimental page layout</li>

        <li>Play with different API fetching</li>
        <li>Playwright test</li>
        <li>Sort desktop/mobile navbar ✅</li>
        <li>About me page dummy data ✅</li>
        <li>Sort thumbnails/ or remove? </li>
        <li>Actually deploy - sort out prod envs ✅</li>
        <li>Find effective home for contentful createClient ✅</li>
        <li>Update Artwork content with meaningful data</li>
        <li>Sort Artwork page out (single carousel) ✅</li>
        <li>Get feedback on metadata/SEO and semantic for Career stuff ✅</li>
        <li>Get feedback on metadata/SEO and semantic for Artwork stuff ✅</li>
        <li>Clean up tailwind classes per already sorted page ✅</li>
        <li>Extract job entry component out ✅</li>
        <li>Add job zod type ✅</li>
        <li>Add all job details in contentful ✅</li>
        <li>Add job details in contentful ✅</li>
        <li>Add more images ✅</li>
        <li>Add fake data for now (just to play with tags)✅</li>
        <li>Start on sorting styling/fonts (global css for general tags)✅ </li>
        <li>Sort out page structure ✅</li>
        <li>pull down from contentful ✅</li>
        <li>Set up contentful: ✅ </li>
      </ol>
    </main>
  );
}
