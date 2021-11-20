import { Container, Space } from "@mantine/core";
import type { NextPage } from "next";
import Feed from "../components/Feed";
import PostEditor from "../components/PostEditor";

const MainPage: NextPage = () => {
	return (
		<>
			<Container mt={50} mb={50} size={600} padding="lg">
				<PostEditor />
				<Space h="lg" />
				<Feed />
			</Container>
		</>
	);
};

export default MainPage;
