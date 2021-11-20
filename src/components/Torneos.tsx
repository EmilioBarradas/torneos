import { useMantineTheme } from "@mantine/styles";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { getRandomColor, getRandomUsername } from "../utils/user";

export const TorneosContext = createContext<TorneosContextI>({
	user: {
		username: "",
		color: "",
	},
	setUser: () => {},
	posts: [],
	setPosts: () => {},
	visiblePosts: [],
	setVisiblePosts: () => {},
	searchTerm: "",
	setSearchTerm: () => {},
	addPosts: () => {},
	removePosts: () => {},
});

const Torneos: FunctionComponent = ({ children }) => {
	const theme = useMantineTheme();

	const [user, setUser] = useState<User>({
		username: getRandomUsername(),
		color: getRandomColor(theme),
	});
	const [posts, setPosts] = useState<Post[]>([]);
	const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const addPosts = (...newPosts: Post[]) => setPosts([...posts, ...newPosts]);

	const removePosts = (...postIds: string[]) => {
		const newPosts = posts.filter((post) => !postIds.includes(post.uid));
		setPosts(newPosts);
	};

	useEffect(() => {
		const lowSearchTerm = searchTerm.toLowerCase();

		const filteredPosts = posts.filter(
			(post) =>
				post.user.username.toLowerCase().includes(lowSearchTerm) ||
				post.media.some((media) =>
					media.data.toLowerCase().includes(lowSearchTerm)
				)
		);

		setVisiblePosts(filteredPosts);
	}, [posts, searchTerm]);

	return (
		<TorneosContext.Provider
			value={{
				user,
				setUser,
				posts,
				setPosts,
				visiblePosts,
				setVisiblePosts,
				searchTerm,
				setSearchTerm,
				addPosts,
				removePosts,
			}}
		>
			{children}
		</TorneosContext.Provider>
	);
};

export default Torneos;
