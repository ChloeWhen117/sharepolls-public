import React, { useState, useCallback } from "react";
import { trpc } from "../../utils/trpc";
import { useUserId } from "../../hooks/useUserId";

export const CreatePoll = () => {
    const maxOptionsLength = 6;
    const { userId } = useUserId();
    const [question, setQuestion] =  useState("");
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState<{body: string}[]>(Array(maxOptionsLength));
    const [optionsLength, setOptionsLength] = useState(1);

    return (
        <div className="flex max-w-2xl items-left ">
            <form
                className="flex flex-col gap-2"
                onSubmit={useCallback(
                    (event: React.FormEvent) => {
                        const createPoll = trpc.poll.createPoll.useMutation();

                        event.preventDefault();

                        if (optionsLength > 1 && userId !== "") {
                            createPoll.mutate({
                                authorId: userId,
                                question,
                                title,
                                options
                            });
                            setQuestion("");
                            setTitle("");
                            setOptions(Array(maxOptionsLength));
                            setOptionsLength(1);
                            (event.target as HTMLFormElement).reset();
                        }
                }, [userId, optionsLength, options, title, question])}
            >
                <input
                    type="text"
                    value={title}
                    placeholder="Title of poll"
                    maxLength={100}
                    onChange={(event) => setTitle(event.target.value)}
                    className="px-4 py-2 rounded-md border-2 border-zinc-800 text-white bg-neutral-900 focus:outline-none"
                />
                <input
                    type="text"
                    value={question}
                    placeholder="Question for poll"
                    maxLength={100}
                    onChange={(event) => setQuestion(event.target.value)}
                    className="px-4 py-2 rounded-md border-2 border-zinc-800 text-white bg-neutral-900 focus:outline-none"
                />
                <div className="flex text-white">Create Poll Options up to maximum of 6.</div>
                    {[...Array(optionsLength)].map((_, idx) => {
                        return (
                            <div 
                                key={idx}
                                className="flex gap-4"
                            >
                                <input
                                    type="text"
                                    value={options[idx]?.body}
                                    placeholder={`Option ${idx + 1}: ...`}
                                    maxLength={100}
                                    onChange={(event) => {
                                        const newOptions = options;
                                        newOptions[idx] = {body: event.target.value};
                                        setOptions(newOptions)
                                    }}
                                    className="px-4 py-2 rounded-md border-2 border-zinc-800 text-white bg-neutral-900 focus:outline-none"
                                />
                                {(idx === optionsLength - 1 && optionsLength !== maxOptionsLength) &&
                                    <button
                                        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                                        onClick={() => {
                                            if (optionsLength < maxOptionsLength) setOptionsLength(optionsLength + 1)
                                        }}
                                    >
                                        +
                                    </button>
                                }
                            </div>
                    )})}
                <div className="flex p-4 items-center justify-center text-white">
                    <button
                        type="submit"
                        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                        >
                        Create a Poll
                    </button>
                </div>
            </form>
        </div>
    )  
}