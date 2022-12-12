/* eslint-disable */
import { type RouterOutputs } from "../../utils/trpc";

type PollType = RouterOutputs["poll"]["createPoll"];

export const PollListCard: React.FC<{poll: PollType}> = (props) => {
    const {poll} = props;
    return (
        <div 
            className="flex w-full flex-col p-8 bg-white dark:hover:bg-white/90 shadow-md rounded-lg"
            key={poll?.id}
        >
            <div className="text-gray-700 font-bold text-lg">{poll?.title}</div>
            <div className="text-gray-700 font-bold text-lg">{poll?.question}</div>
        </div>
    )
}