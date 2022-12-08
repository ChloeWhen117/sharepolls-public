import { trpc } from "../../utils/trpc";

interface PollOptionsProps {
    options: { id: number; value: string; }[]
}

const exampleOptions = [
    {id: 1, value: "Option A"},
    {id: 2, value: "Option B"},
    {id: 3, value: "Option C"},
    {id: 4, value: "Option D"}
  ]

export const PollOptions = () => {
    // const options = exampleOptions;
    const {
        data: pollOptions,
        refetch,
        isLoading,
      } = trpc.useQuery(["polls.getAll"], {
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      });
     
    if (isLoading) return <div className="flex text-white">Fetching messages...</div>;
    if (!pollOptions || pollOptions?.length === 0) return <div className="flex text-white">No Public Polls Found</div>;
    return (
        <div className="flex max-w-2xl items-left ">
            <div className="flex flex-col flex-start">
                {  pollOptions?.length > 0 && (
                    pollOptions.map((option, i) => {
                    return <label 
                                className="flex justify-between items-center max-w-2xl text-white gap-2"
                                key={option.id}>
                                <input 
                                    type="radio" 
                                    name="poll"
                                    value={option.value} 
                                />
                                {option.value}
                            </label>
                }))}
            </div>
        </div>
    )  
}