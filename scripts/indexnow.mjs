import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const HOST = "rishabdugar.in";
const KEY = "6a10e323d82545fa8f7ddaaef6c0e95d";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
	const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
	const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

	if (urlList.length === 0) {
		console.log("[indexnow] No URLs found in sitemap, skipping");
		return;
	}

	const res = await fetch("https://api.indexnow.org/indexnow", {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify({
			host: HOST,
			key: KEY,
			keyLocation: KEY_LOCATION,
			urlList,
		}),
	});

	console.log(`[indexnow] Submitted ${urlList.length} URLs — status ${res.status}`);
}

main().catch((err) => {
	// Never fail the build over an IndexNow ping
	console.warn("[indexnow] submission failed:", err.message);
});
