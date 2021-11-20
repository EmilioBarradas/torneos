import { ActionIcon, Group, Text } from "@mantine/core";
import { FunctionComponent, useState } from "react";

const ReactionButton: FunctionComponent<{
	reaction: Reaction;
	post: Post;
	onClick: () => void;
}> = ({ reaction, post, onClick }) => {
	const [count, setCount] = useState(post.reactions[reaction.id] || 0);

	return (
		<Group spacing={6}>
			<ActionIcon
				key={reaction.title}
				title={reaction.title}
				variant="filled"
				size={32}
				radius="xl"
				color="gray"
				onClick={() => {
					setCount(count + 1);
					onClick();
				}}
			>
				<Text size="sm">{reaction.emoji}</Text>
			</ActionIcon>
			<Text size="sm" weight={700} color="gray">
				{count}
			</Text>
		</Group>
	);
};

export default ReactionButton;
