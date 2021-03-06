import { FunctionComponent, useState, ChangeEvent, useContext } from "react";
import { Button, Group, Text, Textarea } from "@mantine/core";
import { handleErr } from "../utils/error";
import { useNotifications } from "@mantine/notifications";
import { TorneosContext } from "./Torneos";
import { getUrlMedias } from "../utils/url";

const createPost = async (user: User, ...medias: Media[]) => {
	const createPostData: CreatePostData = {
		user,
		media: medias,
	};

	return fetch("https://torneos.torneos.workers.dev/post", {
		method: "POST",
		body: JSON.stringify(createPostData),
	});
};

const PostEditor: FunctionComponent = () => {
	const notifications = useNotifications();
	const torneos = useContext(TorneosContext);

	const [value, setValue] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitPost = async () => {
		const input = value;

		setIsSubmitting(true);
		setValue("");

		const text = input.replaceAll("\n", "");

		const textMedia: Media = {
			type: "text",
			data: text,
		};
		const urlMedias = getUrlMedias(text);

		const [response, error] = await handleErr(
			createPost(torneos.user, textMedia, ...urlMedias)
		);

		setIsSubmitting(false);

		if (error !== null) {
			notifications.showNotification({
				color: "red",
				title: "An error occurred.",
				message: "The post could not be created.",
			});
			return;
		}

		const post = await response?.json();

		torneos.addPosts(post);
	};

	const inputHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = evt.target.value;
		const filteredValue = newValue.replaceAll("\n", "");

		setValue(newValue);
		setCanSubmit(filteredValue.length > 0);
	};

	return (
		<Group direction="column" grow>
			<Group position="apart" align="baseline">
				<Text size="xl" weight={800}>
					What&apos;s on your mind?
				</Text>
				<Text>
					Posting as{" "}
					<b suppressHydrationWarning>{torneos.user.username}</b>
				</Text>
			</Group>

			<Textarea
				autosize
				minRows={4}
				maxRows={8}
				value={value}
				onChange={inputHandler}
			/>

			<Button
				compact
				disabled={!canSubmit}
				loading={isSubmitting}
				onClick={submitPost}
				style={{ alignSelf: "end" }}
			>
				<Text
					size="xs"
					weight={700}
					sx={(theme) => ({ color: theme.colors.gray[0] })}
				>
					Post
				</Text>
			</Button>
		</Group>
	);
};

export default PostEditor;
