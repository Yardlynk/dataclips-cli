import findHerokuToken from "./find-heroku-token.ts";
import deleteDataclip from "./delete-dataclip.ts";

function write(message: string) {
  const text = new TextEncoder().encode(message);
  Deno.writeAll(Deno.stdout, text);
}

async function run() {
  const herokuToken = await findHerokuToken();

  const fileNames = Deno.args;

  if (fileNames.length < 1) {
    throw new Error(`Usage: index.ts <filename> <filename> ...`);
  }

  for (const file of fileNames) {
    const clipSlugs = JSON.parse(await Deno.readTextFile(file))

    for (const clipSlug of clipSlugs) {
      write(`Deleting dataclip ${clipSlug}... `);
      try {
        await deleteDataclip({ clipSlug, authToken: herokuToken });
        console.log("OK");
      } catch (err) {
        console.error("ERROR");
      }
    }
  }
}

try {
  await run();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  Deno.exit(1);
}
