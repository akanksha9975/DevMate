
import { useFileSystem } from "@/context/FileContext"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

interface RenameViewProps {
    id: string
    preName: string
    type: "file" | "directory"
    setEditing: (isEditing: boolean) => void
}

function RenameView({ id, preName, setEditing, type }: RenameViewProps) {
    const [name, setName] = useState<string>(preName || "")
    const { renameFile, openFile, renameDirectory } = useFileSystem()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)

        if (name === "") {
            toast.error(`${capitalizedType} name cannot be empty`)
        } else if (name.length > 25) {
            toast.error(
                `${capitalizedType} name cannot be longer than 25 characters`,
            )
        } else if (name === preName) {
            toast.error(`${capitalizedType} name cannot be the same as before`)
        } else {
            const isRenamed =
                type === "directory"
                    ? renameDirectory(id, name)
                    : renameFile(id, name)

            if (isRenamed && type === "file") {
                openFile(id)
            }
            if (!isRenamed) {
                toast.error(`${capitalizedType} with same name already exists`)
            } else {
                setEditing(false)
            }
        }
    }

    const handleFormKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                formRef.current?.requestSubmit()
            } else if (e.key === "Escape") {
                setEditing(false)
            }
        },
        [setEditing],
    )

    const handleDocumentEvent = useCallback(
        (e: KeyboardEvent | MouseEvent) => {
            const formNode = formRef.current
            if (formNode && !formNode.contains(e.target as Node)) {
                setEditing(false)
            }
        },
        [setEditing],
    )

    useEffect(() => {
        const formNode = formRef.current
        if (!formNode) return

        formNode.focus()

        formNode.addEventListener("keydown", handleFormKeyDown)
        document.addEventListener("keydown", handleDocumentEvent)
        document.addEventListener("click", handleDocumentEvent)

        return () => {
            formNode.removeEventListener("keydown", handleFormKeyDown)
            document.removeEventListener("keydown", handleDocumentEvent)
            document.removeEventListener("click", handleDocumentEvent)
        }
    }, [handleDocumentEvent, handleFormKeyDown, setEditing])

    return (
        <div className="rounded-md">
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="flex w-full items-center gap-2 rounded-md bg-gradient-to-r from-yellow-50 to-orange-50 p-1 shadow-inner"
            >
                <input
                    type="text"
                    className="w-full flex-grow rounded-md border border-yellow-400 bg-white px-3 py-1 text-base text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
        </div>
    )
}

export default RenameView
