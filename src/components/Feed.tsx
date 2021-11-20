import { Center, Group, Loader } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { handleErr } from "../utils/error";
import Post from "./Post";
import Searchbar from "./Searchbar";
import { TorneosContext } from "./Torneos";

const Feed: FunctionComponent = () => {
	const notifications = useNotifications();
	const { visiblePosts, setPosts } = useContext(TorneosContext);

	const [loaded, setLoaded] = useState(false);

	const loadPosts = async () => {
		const [response, error] = await handleErr(
			fetch("http://localhost:8787/posts")
		);

		if (error !== null) {
			notifications.showNotification({
				color: "red",
				title: "An error occurred.",
				message: "The feed posts could not be retrieved.",
			});
			return;
		}

		const posts = await response?.json();

		setPosts(posts);

		setLoaded(true);
	};

	useEffect(() => {
		loadPosts();
	}, []);

	if (!loaded) {
		return (
			<Center>
				<Loader color="gray" variant="dots" />
			</Center>
		);
	}

	return (
		<Group direction="column" grow>
			<Searchbar />

			<Group
				direction="column"
				grow
				style={{ flexDirection: "column-reverse" }}
			>
				{visiblePosts.map((post) => (
					<Post key={post.uid} post={post} />
				))}
			</Group>
		</Group>
	);
};

export default Feed;
