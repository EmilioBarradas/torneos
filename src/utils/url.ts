import urlRegex from "url-regex";

const URL_REGEX = urlRegex();
const MEDIA_TYPES = [
	{ id: "youtube", delimiter: "v=" },
	{ id: "giphy", delimiter: "-" },
];

export const getUrls = (str: string) => str.match(URL_REGEX);

export const getUrlMedias = (str: string): Media[] => {
	const urls = getUrls(str);
	if (urls === null) return [];

	const medias = urls
		.map((url) => {
			const urlParts = url.split(".");

			const type = MEDIA_TYPES.find((type) =>
				urlParts.find((part) => part === type.id)
			);
			if (type === undefined) return;

			const idParts = urlParts[urlParts.length - 1].split(type.delimiter);
			const id = idParts[idParts.length - 1];

			return {
				type: type.id,
				data: id,
			};
		})
		.filter((media) => media !== undefined);

	return medias as Media[];
};
