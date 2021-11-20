import { MantineTheme } from "@mantine/styles";

const friendlyWords = require("friendly-words");

export const getRandomColor = (theme: MantineTheme) => {
	const themeColors = Object.keys(theme.colors);
	const colorIdx = Math.floor(Math.random() * themeColors.length);

	return themeColors[colorIdx];
};

export const getRandomUsername = () => {
	const predicateIdx = Math.floor(
		Math.random() * friendlyWords.predicates.length
	);
	const objectIdx = Math.floor(
		Math.random() * friendlyWords.predicates.length
	);

	const predicate = friendlyWords.predicates[predicateIdx];
	const object = friendlyWords.objects[objectIdx];

	const capPredicate =
		predicate.substring(0, 1).toUpperCase() + predicate.substring(1);
	const capObject =
		object.substring(0, 1).toUpperCase() + object.substring(1);

	return `${capPredicate}-${capObject}`;
};

export const getInitials = (str: string) => {
	return str
		.split("")
		.filter((c) => c !== "-" && c === c.toUpperCase())
		.join("");
};
