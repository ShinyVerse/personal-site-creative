import ClientBreedsList from "./ClientBreedsList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = (await searchParams).page ?? "1";

  const res = await fetch(`https://catfact.ninja/breeds?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch breeds");

  const json = await res.json();

  return (
    <main>
      {/* Pass initial data and page to client component */}
      <ClientBreedsList initialData={json.data} initialPage={Number(page)} />
    </main>
  );
}
