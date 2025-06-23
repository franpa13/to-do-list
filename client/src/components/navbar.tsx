import { ModeToggle } from "./ui/mode-toggle"

export const Navbar = () => {
    return (
        <div className='flex justify-between px-6 py-3 items-center w-full'>
            <div className="flex gap-1">
                <h1 className=" text-3xl font-bold mb-4">Todo</h1>
                <h2 className='text-blue-500 text-3xl font-bold mb-4'>
                    App
                </h2>
            </div>

            <ModeToggle />
        </div>
    )
}
