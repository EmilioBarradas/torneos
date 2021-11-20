import { Group } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FunctionComponent } from "react";
import { handleErr } from "../utils/error";
import ReactionButton from "./ReactionButton";

const reactions: Reaction[] = [
	{ id: "heart", title: "Heart", emoji: "❤️" },
	{ id: "thumbsUp", title: "Thumbs Up", emoji: "👍" },
	{ id: "thumbsDown", title: "Thumbs Down", emoji: "👎" },
	{ id: "cryingLaughing", title: "Cry Laughing", emoji: "😂" },
];

const ReactionsBar: FunctionComponent<{ post: Post }> = ({ post }) => {
	const notifications = useNotifications();

	const addReaction = async (reactionId: string) => {
		post.reactions[reactionId] = (post.reactions[reactionId] || 0) + 1;

		const addReactionData = {
			postId: post.uid,
			reactionId: reactionId,
		};

		const [_, error] = await handleErr(
			fetch("http://localhost:8787/reaction", {
				method: "POST",
				body: JSON.stringify(addReactionData),
			})
		);

		if (error !== null) {
			notifications.showNotification({
				color: "red",
				title: "An error occurred.",
				message: "The reaction could not be added.",
			});
			return;
		}
	};

	return (
		<Group spacing={12} mt={8}>
			{reactions.map((reaction) => (
				<ReactionButton
					key={reaction.id}
					reaction={reaction}
					post={post}
					onClick={() => addReaction(reaction.id)}
				/>
			))}
		</Group>
	);
};

export default ReactionsBar;
