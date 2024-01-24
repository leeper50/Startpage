import { db } from "$lib/db.js";

export async function POST(event): Promise<Response> {
  const user = await event.request.json();
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
  return new Response("Settings updated", { status: 200 });
}
