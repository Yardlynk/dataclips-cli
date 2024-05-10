import { fetchClipDetailsQuery, deleteClipQuery } from "./queries.ts";

const apiBase = "https://data-api.heroku.com/graphql";

interface Options {
  clipSlug: string;
  authToken: string;
}

async function makeRequest<ResponseType>(
  query: string,
  variables: Record<any, any>,
  authToken: string,
): Promise<ResponseType> {
  const payload = {
    query,
    variables,
  };

  const result = await fetch(apiBase, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${authToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (result.status >= 400) {
    const bodyText = await result.text();
    console.error(bodyText);
    throw new Error(`Unexpected Heroku response: ${result.status}`);
  }

  const body = await result.json();

  if (body.errors) {
    console.log(body);
    throw new Error(`Unexpected Heroku response`);
  }

  return body;
}



interface ClipDetailsResponse {
  data: {
    clip: {
      id: string;
    };
  };
}

export default async function deleteDataclip(options: Options): Promise<void> {
  const details = await makeRequest<ClipDetailsResponse>(
    fetchClipDetailsQuery,
    {
      slug: options.clipSlug,
    },
    options.authToken,
  );

  await makeRequest<unknown>(
    deleteClipQuery,
    {
      clipId: details.data.clip.id
    },
    options.authToken,
  );
}
