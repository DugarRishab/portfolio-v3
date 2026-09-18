import React from "react";
import { Head } from "vite-react-ssg";

export const SITE_URL = "https://rishabdugar.in";
export const SITE_NAME = "Rishab Dugar";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SiteHeadProps {
	title: string;
	description: string;
	path: string;
	noindex?: boolean;
	type?: "website" | "article" | "profile";
	jsonLd?: object | object[];
}

export const SiteHead: React.FC<SiteHeadProps> = ({
	title,
	description,
	path,
	noindex,
	type = "website",
	jsonLd,
}) => {
	const url = `${SITE_URL}${path}`;
	const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

	return (
		<Head>
			<html lang="en" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />
			{noindex && <meta name="robots" content="noindex, nofollow" />}
			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:type" content={type} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={OG_IMAGE} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={OG_IMAGE} />
			{schemas.map((schema, i) => (
				<script key={i} type="application/ld+json">
					{JSON.stringify(schema)}
				</script>
			))}
		</Head>
	);
};
