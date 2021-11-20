import { FunctionComponent, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RelativeTime: FunctionComponent<{ date: number }> = ({ date }) => {
	const [time, setTime] = useState("");

	const updateTime = () => {
		const time = dayjs(date).fromNow();
		setTime(time);
	};

	useEffect(() => {
		updateTime();

		const id = setInterval(updateTime, 10000);

		return () => {
			clearInterval(id);
		};
	}, []);

	return <>{time}</>;
};

export default RelativeTime;
