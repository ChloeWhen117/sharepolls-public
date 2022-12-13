/* eslint-disable */
import { useForm, SubmitHandler } from "react-hook-form";
import { type RouterOutputs } from "@/utils/trpc";
type PollType = RouterOutputs["poll"]["createPoll"];
import { getPollUrl } from "@/utils/common";

export const PollDetails: React.FC<{ poll: PollType }> = (props) => {
  const { poll } = props;
  const form = useForm();
  const {
    register,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  return (
    <section className="container flex flex-col gap-4 py-24 px-48">
      <h2 className="mx-auto flex max-w-xs p-4 text-5xl font-bold text-white">
        Poll Details
      </h2>
      <div className="flex p-4 font-bold text-white">{poll?.title}</div>
      <div className="flex p-4 font-bold text-white">{poll?.question}</div>
      <div className="flex gap-4 whitespace-nowrap p-4 font-bold text-white">
        <span className="flex">Share URL:</span>
        <div className="rounded-s w-full border-2 border-zinc-800 bg-neutral-900">
          {getPollUrl(poll?.id || "")}
        </div>
      </div>
      <div className="flex flex-col p-8">
        <div className="max-w-ws mx-auto flex p-4 font-bold text-white">
          Vote for one
        </div>
        <form>
          {/* @ts-ignore*/
            poll?.options.map((option, idx) => {
              return (
                <label>
                  <div className="flex gap-2 border-2 border-white p-4 text-white">
                    <input
                      type="radio"
                      id={`option${idx}`}
                      value="option"
                      {...register("vote")}
                    />
                    {option?.body}
                  </div>
                </label>
              );
            })}
        </form>
      </div>
      <div className="flex items-center justify-center p-4 text-white">
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          disabled
        >
          Submitting Votes Disabled Until Future Update
        </button>
      </div>
    </section>
  );
};
