import { Button, Group, Text, Textarea } from "@mantine/core";
import {
	FunctionComponent,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";

const isClamped = (ref: RefObject<HTMLDivElement>) => {
	if (ref.current === null) return false;
	return ref.current.clientHeight < ref.current.scrollHeight;
};

const Media: FunctionComponent<{ media: Media; isEditing: boolean }> = ({
	media,
	isEditing,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [expanded, setExpanded] = useState(false);
	const [moreVisible, setMoreVisible] = useState(false);
	const [copiedData, setCopiedData] = useState(media.data);

	useEffect(() => {
		const lineClamped = isClamped(ref);
		setMoreVisible(lineClamped);
	}, []);

	return (
		<Group direction="column" spacing="xs" style={{ width: "100%" }} grow>
			{isEditing && media.type === "text" && (
				<Textarea
					value={copiedData}
					autosize
					minRows={3}
					maxRows={6}
					onChange={(evt) => {
						setCopiedData(evt.target.value);
						media.data = evt.target.value;
					}}
				/>
			)}
			{!isEditing && media.type === "text" && (
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
		</Group>
	);
};

export default Media;
