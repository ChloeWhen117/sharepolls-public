import { trpc } from "../../../utils/trpc";

interface CreatePollBtnProps {
    question: string,
    title: string,
    options: string[]
}

export const CreatePollButton = ({question, title, options}: CreatePollBtnProps) => {
    const createPoll = trpc.useMutation("polls.createPoll");
    return (
        <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => {}}
            >
            Create a Poll
        </button>
    )
}