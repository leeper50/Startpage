import { db } from "$lib/db.js";
import type { User } from "@prisma/client";

// update commands
export async function PUT({ request, locals }): Promise<Response> {
  const { user } = locals;
  if (!user) return new Response("Need User", { status: 401 });
  const body = (await request.json()) as User;
  if (!body) return new Response("Invalid JSON", { status: 400 });
  if (body.name !== user.name && !user.isAdmin)
    return new Response("Unauthorized Access", { status: 403 });
  try {
    await db.user.update({
      where: {
        name: body.name,
      },
      data: {
        ...body,
      },
    });
  } catch (_) {
    return new Response("Invalid JSON", { status: 400 });
  }
  return new Response("User updated", { status: 200 });
}

// delete commands
export async function DELETE({ request, locals }): Promise<Response> {
  const { user } = locals;
  if (!user) return new Response("Need User", { status: 401 });
  const body = (await request.json()) as User;
  if (!body) return new Response("Invalid JSON", { status: 400 });
  if (body.name !== user.name && !user.isAdmin)
    return new Response("Unauthorized Access", { status: 403 });
  try {
    await db.user.delete({
      where: {
        name: body.name,
      },
    });
  } catch (_) {
    return new Response("Invalid JSON", { status: 400 });
  }
  return new Response("User deleted", { status: 200 });
}
