// export default async function Home() {
//   const res = await client.getEntries({ content_type: "photo" });
//   const photos = res.items;
//   console.log(photos);

//   // const photos: Photo[] = await getPhotosByCollection("photosCollection");

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         {photos.map((photo) => (
//           <div key={photo.sys.id}>
//             <Image
//               // className="dark:invert"
//               src={"https:" + photo.fields.thumbnail.fields.file.url}
//               alt="frog"
//               // width={photo.fields.thumbnail.fields.file.details.image.width}
//               // height={photo.fields.thumbnail.fields.file.details.image.height}
//               width={100}
//               height={100}
//               priority
//             />
//           </div>
//         ))}
//         <h1>Todo list</h1>
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li>Set up contentful: ✅ </li>
//           <li>pull down from contentful ✅</li>
//           <li>Add more images and sort out thumbnails </li>
//           <li>Sort styling/fonts </li>
//           <li>Add fake data for now (just to play with tags)</li>
//           <li>Sort out page structure</li>
//         </ol>
//       </main>
//     </div>
//   );
// }

export default async function HomePage() {
  // const res = await client.getEntries({ content_type: "photo" });
  // const photos = res.items;
  // console.log(photos);

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
