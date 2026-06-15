import { unstable_cache } from "next/cache";
import { fetchBggRepresentativeImage } from "@/lib/bgg";

function getCachedBggImage(bggId: number) {
  return unstable_cache(
    () => fetchBggRepresentativeImage(bggId),
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
    const data = await getCachedBggImage(bggId);

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return Response.json({ error: "Failed to fetch from BGG" }, { status: 502 });
  }
}
