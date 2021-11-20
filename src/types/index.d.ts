interface Post {
	createdAt: number;
	uid: string;
	user: User;
	media: Media[];
	reactions: { [reactionId: string]: number };
}

interface User {
	username: string;
	color: string;
}

interface Media {
	type: MediaType;
	data: string;
}

type MediaType = "text" | "giphy" | "youtube";

interface CreatePostData {
	user: User;
	media: Media[];
}

interface UpdatePostData {
	media: Omit<Media, "type">[];
}

interface Reaction {
	id: string;
	title: string;
	emoji: string;
}

interface AddReactionData {
	postId: string;
	reactionId: string;
}

interface TorneosContextI {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[]>>;
	visiblePosts: Post[];
	setVisiblePosts: Dispatch<SetStateAction<Post[]>>;
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
	addPosts: (...posts: Post[]) => void;
	removePosts: (...postsIds: string[]) => void;
}

interface PostContextI {
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	isDeleting: boolean;
	setIsDeleting: Dispatch<SetStateAction<boolean>>;
}
