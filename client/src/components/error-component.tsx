import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
    error: string;
}

export const ErrorComponent = ({ error }: Props) => {
    return (
    <section className="h-[500px] p-3 flex justify-center items-center">
        <Alert className="w-full lg:w-1/3" variant="destructive">
            <Terminal />
            <AlertTitle>Ha ocurrido un error, intentelo nuevamente !</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    </section>

    )
}
