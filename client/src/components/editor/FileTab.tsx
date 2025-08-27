
import { useFileSystem } from "@/context/FileContext"
import { getIconClassName } from "@/utils/getIconClassName"
import { Icon } from "@iconify/react"
import { IoClose } from "react-icons/io5"
import cn from "classnames"
import { useEffect, useRef } from "react"
import customMapping from "@/utils/customMapping"
import { useSettings } from "@/context/SettingContext"
import langMap from "lang-map"

function FileTab() {
    const {
        openFiles,
        closeFile,
        activeFile,
        updateFileContent,
        setActiveFile,
    } = useFileSystem()
    const fileTabRef = useRef<HTMLDivElement>(null)
    const { setLanguage } = useSettings()

    const changeActiveFile = (fileId: string) => {
        if (activeFile?.id === fileId) return

        updateFileContent(activeFile?.id || "", activeFile?.content || "")

        const file = openFiles.find((file) => file.id === fileId)
        if (file) {
            setActiveFile(file)
        }
    }

    useEffect(() => {
        const fileTabNode = fileTabRef.current
        if (!fileTabNode) return

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                fileTabNode.scrollLeft += 100
            } else {
                fileTabNode.scrollLeft -= 100
            }
        }

        fileTabNode.addEventListener("wheel", handleWheel)

        return () => {
            fileTabNode.removeEventListener("wheel", handleWheel)
        }
    }, [])

    useEffect(() => {
        if (activeFile?.name === undefined) return
        const extension = activeFile.name.split(".").pop()
        if (!extension) return

        if (customMapping[extension]) {
            setLanguage(customMapping[extension])
            return
        }

        const language = langMap.languages(extension)
        setLanguage(language[0])
    }, [activeFile?.name, setLanguage])

    return (
        <div
            className="flex h-[50px] w-full select-none gap-2 overflow-x-auto p-2 pb-0 bg-gradient-to-r from-yellow-50 to-orange-50"
            ref={fileTabRef}
        >
            {openFiles.map((file) => (
                <span
                    key={file.id}
                    className={cn(
                        "flex w-fit cursor-pointer items-center rounded-t-xl px-3 py-2 text-gray-800 transition-all duration-300 shadow-sm",
                        file.id === activeFile?.id
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md"
                            : "bg-white hover:bg-yellow-100 hover:shadow-md",
                    )}
                    onClick={() => changeActiveFile(file.id)}
                >
                    <Icon
                        icon={getIconClassName(file.name)}
                        fontSize={20}
                        className="mr-2 min-w-fit"
                    />
                    <p
                        className="flex-grow cursor-pointer overflow-hidden truncate font-medium"
                        title={file.name}
                    >
                        {file.name}
                    </p>
                    <IoClose
                        className={cn(
                            "ml-3 inline rounded-md p-1 transition-colors duration-200",
                            file.id === activeFile?.id
                                ? "hover:bg-orange-400"
                                : "hover:bg-yellow-200",
                        )}
                        size={18}
                        onClick={(e) => {
                            e.stopPropagation()
                            closeFile(file.id)
                        }}
                    />
                </span>
            ))}
        </div>
    )
}

export default FileTab
