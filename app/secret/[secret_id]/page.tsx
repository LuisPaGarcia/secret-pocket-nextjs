async function getData(params: { secret_id: string }) {
  const res = await fetch(
    `http://localhost:3000/.netlify/functions/get_secret/?id=${params.secret_id}`,
    { cache: "no-cache" }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Page({
  params,
}: {
  params: { secret_id: string };
}) {
  const data = await getData(params);
  return <div>My Secret: {data?.data?.content || 'Secret already visited'}</div>;
}
