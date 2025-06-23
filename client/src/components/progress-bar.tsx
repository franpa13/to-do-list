import { Progress } from "@/components/ui/progress"
import { ListTodo } from "lucide-react"
import { useEffect, useState } from "react"


export const ProgressBar = () => {
    const [progress, setProgress] = useState(8)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex mt-44 gap-12 flex-col justify-start items-center  blink">
            <ListTodo size={36} />
            <Progress value={progress} className="w-[20%]" />
        </div>
    )
}
