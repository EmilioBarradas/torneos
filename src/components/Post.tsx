import { ActionIcon, Avatar, Card, Group, Text } from "@mantine/core";
import { CheckIcon, Pencil2Icon, TrashIcon } from "@modulz/radix-icons";
import { createContext, FunctionComponent, useContext, useState } from "react";
import Media from "./Media";
import RelativeTime from "./RelativeTime";
import { getInitials } from "../utils/user";
import { TorneosContext } from "./Torneos";
import { useNotifications } from "@mantine/notifications";
import { handleErr } from "../utils/error";
import ReactionsBar from "./ReactionsBar";

const PostContext = createContext<PostContextI>({
	isEditing: false,
	setIsDeleting: () => {},
	isDeleting: false,
	setIsEditing: () => {},
});

const UserContainer: FunctionComponent<{ user: User }> = ({ user }) => (
	<Group style={{ flexShrink: 0 }}>
		<Avatar size={52} radius="xl" color={user.color}>
			{getInitials(user.username)}
		</Avatar>
	</Group>
);

const MediaContainer: FunctionComponent<{ post: Post }> = ({ post }) => {
	const { isEditing } = useContext(PostContext);

	return (
		<Group direction="column" spacing="xs" style={{ width: "100%" }}>
			<Group spacing="xs">
				<Text size="lg" weight={700}>
					{post.user.username}
				</Text>
				<Text size="xs">
					<RelativeTime date={post.createdAt} />
				</Text>
			</Group>

			{post.media.map((media) => (
				<Media
					key={Math.random()}
					media={media}
					isEditing={isEditing}
				/>
			))}
		</Group>
	);
};

const ModificationContainer: FunctionComponent<{ post: Post }> = ({ post }) => {
	const notifications = useNotifications();
	const torneos = useContext(TorneosContext);
	const { isEditing, setIsEditing, isDeleting, setIsDeleting } =
		useContext(PostContext);

	const isUsersPost = torneos?.user.username === post.user.username;

	const deletePost = async () => {
		setIsDeleting(true);

		const [_, error] = await handleErr(
			fetch(`http://localhost:8787/post/${post.uid}`, {
				method: "DELETE",
			})
		);

		setIsDeleting(false);

		if (error !== null) {
			notifications.showNotification({
				color: "red",
				title: "An error occurred.",
				message: "The post could not be deleted.",
			});
			return;
		}

		torneos.removePosts(post.uid);
	};

	const savePost = async () => {
		const updatePostData: UpdatePostData = {
			media: post.media.map((media) => ({ data: media.data })),
		};

		const [_, error] = await handleErr(
			fetch(`http://localhost:8787/post/${post.uid}`, {
				method: "PATCH",
				body: JSON.stringify(updatePostData),
			})
		);

		if (error !== null) {
			notifications.showNotification({
				color: "red",
				title: "An error occurred.",
				message: "The post could not be saved.",
			});
			return;
		}
	};

	return (
		<Group
			style={{
				flexShrink: 0,
				visibility: isUsersPost ? "initial" : "hidden",
			}}
			spacing="xs"
		>
			<ActionIcon
				variant="light"
				title={isEditing ? "Save Post" : "Edit Post"}
				onClick={() => {
					if (isEditing) savePost();
					setIsEditing(!isEditing);
				}}
			>
				{isEditing ? <CheckIcon /> : <Pencil2Icon />}
			</ActionIcon>

			<ActionIcon
				variant="light"
				title="Delete Post"
				disabled={isDeleting}
				onClick={deletePost}
			>
				<TrashIcon />
			</ActionIcon>
		</Group>
	);
};

const Post: FunctionComponent<{ post: Post }> = ({ post }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	return (
		<PostContext.Provider
			value={{ isEditing, setIsEditing, isDeleting, setIsDeleting }}
		>
			<Card padding="lg">
				<Group align="start" noWrap>
					<UserContainer user={post.user} />

					<Group direction="column" style={{ flexGrow: 1 }}>
						<MediaContainer post={post} />
						<ReactionsBar post={post} />
					</Group>

					<ModificationContainer post={post} />
				</Group>
			</Card>
		</PostContext.Provider>
	);
};

export default Post;
