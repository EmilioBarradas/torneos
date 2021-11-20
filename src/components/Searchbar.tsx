import { Group, Kbd, Text, TextInput } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import { FunctionComponent, useContext, useRef } from "react";
import { TorneosContext } from "./Torneos";

export const Searchbar: FunctionComponent = () => {
	const { searchTerm, setSearchTerm } = useContext(TorneosContext);

	const searchRef = useRef<HTMLInputElement>(null);

	useHotkeys([
		[
			"ctrl+K",
			() => {
				searchRef.current?.focus();
			},
		],
	]);

	return (
		<TextInput
			ref={searchRef}
			placeholder="Search"
			value={searchTerm}
			icon={<MagnifyingGlassIcon />}
			rightSectionWidth={90}
			rightSection={
				<Group spacing={0}>
					<Kbd>Ctrl</Kbd>
					<Text style={{ margin: "0.25rem" }}>+</Text>
					<Kbd>K</Kbd>
				</Group>
			}
			styles={{ rightSection: { pointerEvents: "none" } }}
			onChange={(evt) => setSearchTerm(evt.target.value)}
		/>
	);
};

export default Searchbar;
