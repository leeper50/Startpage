import { client } from "$lib/db.js";

export async function DELETE({ request }): Promise<Response> {
  const { id } = await request.json();
  client.del(id);
  return new Response("Settings reset", { status: 200 });
}
