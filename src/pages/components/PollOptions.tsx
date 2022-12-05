interface PollOptionsProps {
    options: { id: number; value: string; }[]
}
  
export const PollOptions = ({options}: PollOptionsProps ) => {
    return (
        <>
        {  options.length > 0 && (
            options.map((option, i) => {
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
        </>
    )  
}