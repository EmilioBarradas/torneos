import { GiphyFetch } from "@giphy/js-fetch-api";

const GIPHY_FETCH = new GiphyFetch("M6IrxX3z8N8R8JGBx0lf2OHYR3wajWS0");

export const getGif = async (gifId: string) => {
	const { data } = await GIPHY_FETCH.gif(gifId);
	return data;
};
