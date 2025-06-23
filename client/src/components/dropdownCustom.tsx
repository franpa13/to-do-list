import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

interface PropsDropdown {
    title: string,
    children:  ReactNode
}
export const DropdownCustom = ({ title, children }: PropsDropdown) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    {title} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
