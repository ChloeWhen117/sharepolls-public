/* eslint-disable */
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { getPollUrl, getUserVoteRecord, type PollType } from "@/utils/common";
import { useUserId } from "@/hooks/useUserId";
import { DismissableAlert } from "@/components/common/Alert/DismissableAlert";

const FormSchema = z.object({
  optionId: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const PollDetails: React.FC<{ poll: PollType }> = (props) => {
  const { poll } = props;
  const { userId } = useUserId();
  const userVoteRecord = getUserVoteRecord(poll, userId);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    defaultValues: { optionId: userVoteRecord?.optionId },
    resolver: zodResolver(FormSchema),
  });
  const castVote = trpc.pollVote.castVote.useMutation();
  const submitLabel = userVoteRecord?.optionId ? "Update Vote" : "Submit Vote";

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const input = {
      userId,
      pollId: poll?.id || "",
      optionId: data.optionId || "",
    };
    await new Promise(async (resolve) => {
      /*
      await setTimeout(() => {
        console.log(input);
        resolve(undefined);
      }, 3000);
    });
    */
    if (input.optionId !== "" && input.optionId !== "") {
      castVote.mutate(input);
    }
  };

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
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {poll &&
            poll?.options.map((option, idx) => {
              return (
                <label key={`option_${option.id}`}>
                  <div className="flex gap-2 border-2 border-white p-4 text-white">
                    <input
                      type="radio"
                      id={`option${idx}`}
                      value={option?.id}
                      {...register("optionId")}
                    />
                    {option?.body}
                  </div>
                </label>
              );
            })}
          <div className="flex items-center justify-center px-8 pt-8 text-white">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
      <div>
        {isSubmitting && (
          <DismissableAlert type="info" message="Submitting Vote" />
        )}
        {isSubmitSuccessful && (
          <DismissableAlert type="success" message="Vote Submitted" />
        )}
      </div>
    </section>
  );
};
