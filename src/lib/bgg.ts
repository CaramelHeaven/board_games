const BGG_API = "https://api.geekdo.com/api/geekitems";

type BggGeekItemResponse = {
  item: {
    images?: {
      square200?: string;
      square?: string;
      previewthumb?: string;
      thumb?: string;
      original?: string;
    };
  };
};

export async function fetchBggRepresentativeImageUrl(
  bggId: number,
): Promise<string> {
  const response = await fetch(
    `${BGG_API}?objectid=${bggId}&objecttype=thing&nosession=1`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`BGG API responded with ${response.status}`);
  }

  const data = (await response.json()) as BggGeekItemResponse;
  const images = data.item.images;
  const imageUrl =
    images?.square200 ??
    images?.square ??
    images?.previewthumb ??
    images?.thumb ??
    images?.original;

  if (!imageUrl) {
    throw new Error(`BGG game ${bggId} has no representative image`);
  }

  return imageUrl;
}
