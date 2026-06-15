import { unstable_cache } from "next/cache";
import { fetchBggRepresentativeImageUrl } from "@/lib/bgg";

function getCachedBggImageUrl(bggId: number) {
  return unstable_cache(
    () => fetchBggRepresentativeImageUrl(bggId),
    ["bgg-representative-image", "square200", String(bggId)],
    { revalidate: 3600 },
  )();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bggId = Number(id);

  if (!Number.isInteger(bggId) || bggId <= 0) {
    return Response.json({ error: "Invalid BGG id" }, { status: 400 });
  }

  try {
    const imageUrl = await getCachedBggImageUrl(bggId);

    return Response.json(
      { imageUrl },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json({ error: "Failed to fetch from BGG" }, { status: 502 });
  }
}
