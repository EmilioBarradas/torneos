import { Gif } from "@giphy/react-components";
import { IGif } from "@giphy/js-types";
import { Button, Group, Text, Textarea } from "@mantine/core";
import {
	FunctionComponent,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { getGif } from "../utils/giphy";

const isClamped = (ref: RefObject<HTMLDivElement>) => {
	if (ref.current === null) return false;
	return ref.current.clientHeight < ref.current.scrollHeight;
};

const TextMedia: FunctionComponent<{ media: Media; isEditing: boolean }> = ({
	media,
	isEditing,
}) => {
	const [copiedText, setCopiedText] = useState(media.data);
	const [expanded, setExpanded] = useState(false);
	const [moreVisible, setMoreVisible] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const lineClamped = isClamped(ref);
		setMoreVisible(lineClamped);
	}, []);

	return (
		<>
			{isEditing && (
				<Textarea
					value={copiedText}
					autosize
					minRows={3}
					maxRows={6}
					onChange={(evt) => {
						setCopiedText(evt.target.value);
						media.data = evt.target.value;
					}}
				/>
			)}
			{!isEditing && (
				<Text ref={ref} lineClamp={expanded ? -1 : 4}>
					{media.data}
				</Text>
			)}

			{moreVisible && (
				<Button
					variant="outline"
					color="gray"
					size="xs"
					compact
					style={{ alignSelf: "end" }}
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? "Less" : "More"}
				</Button>
			)}
		</>
	);
};

const GiphyMedia: FunctionComponent<{ id: string }> = ({ id }) => {
	const [gif, setGif] = useState<IGif | null>(null);

	const loadGif = async () => {
		const data = await getGif(id);
		setGif(data);
	};

	useEffect(() => {
		loadGif();
	}, []);

	return gif && <Gif gif={gif} width={350} />;
};

const YouTubeMedia: FunctionComponent<{ id: string }> = ({ id }) => {
	return (
		<iframe
			src={`http://www.youtube.com/embed/${id}`}
			width="350"
			height="350"
			frameBorder="0"
			allowFullScreen
		></iframe>
	);
};

const Media: FunctionComponent<{ media: Media; isEditing: boolean }> = ({
	media,
	isEditing,
}) => {
	return (
		<Group direction="column" spacing="xs" style={{ width: "100%" }} grow>
			{media.type === "text" && (
				<TextMedia media={media} isEditing={isEditing} />
			)}
			{media.type === "giphy" && <GiphyMedia id={media.data} />}
			{media.type === "youtube" && <YouTubeMedia id={media.data} />}
		</Group>
	);
};

export default Media;
