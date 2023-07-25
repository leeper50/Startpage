export const prerender = 'auto';

export async function GET({ params }) {
  const { url } = params;
  return fetch(`https://www.google.com/s2/favicons?sz=32&domain=${url}`);
}
