import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { useUserId } from "@/hooks/useUserId";
import { useRouter } from "next/router";

const FormSchema = z.object({
  title: z.string(),
  question: z.string(),
  options: z.array(
    z.object({
      body: z.string(),
    })
  ),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const CreatePoll = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const { userId } = useUserId();
  const maxOptionsLength = 6;
  const [optionsLength, setOptionsLength] = useState(1);
  const createPoll = trpc.poll.createPoll.useMutation();

  const handleIncrementOptionsLength = () => {
    setOptionsLength(optionsLength + 1);
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      await setTimeout(() => {
        console.log(data);
        resolve(undefined);
      }, 3000);
    });

    if (optionsLength > 1 && userId !== "") {
      const { question, title, options } = data;
      createPoll.mutate({
        authorId: userId,
        question,
        title,
        options,
      });
      router.push("/");
    }
  };
  useEffect(() => {
    reset({
      title: "Title",
      question: "Question",
      options: [{ body: "Option 1" }],
    });
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="items-left flex max-w-2xl ">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex p-4 font-bold text-white">Register a poll.</div>
        <div className="text-white">Title</div>
        <input
          {...register("title", { value: "Title" })}
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white"
          disabled={isSubmitting}
        />
        <div className="text-white">Question</div>
        <input
          {...register("question", { value: "Question" })}
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white"
          disabled={isSubmitting}
        />
        <div className="flex p-4 font-bold text-white">
          Create Poll Options with at least two options and also up to maximum
          of 6 options.
        </div>
        {[...Array(optionsLength)].map((_, idx) => {
          return (
            <div key={`option-${idx}`} className="flex flex-col gap-2">
              <div className="text-white">Option #{idx + 1}</div>
              <input
                className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white"
                {...register(`options.${idx}.body`, {
                  required: true,
                  value: `Option ${idx + 1}`,
                })}
                disabled={isSubmitting}
              />
            </div>
          );
        })}
        {optionsLength !== maxOptionsLength && (
          <button
            type="button"
            className="rounded-full rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 font-semibold text-white text-white no-underline transition hover:bg-neutral-700"
            onClick={handleIncrementOptionsLength}
            disabled={isSubmitting}
          >
            + Add New Option
          </button>
        )}
        <div className="flex items-center justify-center p-4 text-white">
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            disabled={isSubmitting}
          >
            Create a Poll
          </button>
        </div>
      </form>
    </div>
  );
};
