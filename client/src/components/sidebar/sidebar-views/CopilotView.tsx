


import { useCopilot } from "@/context/CopilotContext"
import { useFileSystem } from "@/context/FileContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { SocketEvent } from "@/types/socket"
import toast from "react-hot-toast"
import { LuClipboardPaste, LuCopy, LuRepeat } from "react-icons/lu"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"

function CopilotView() {
    const { socket } = useSocket()
    const { viewHeight } = useResponsive()
    const { generateCode, output, isRunning, setInput } = useCopilot()
    const { activeFile, updateFileContent, setActiveFile } = useFileSystem()

    const copyOutput = async () => {
        try {
            const content = output.replace(/```[\w]*\n?/g, "").trim()
            await navigator.clipboard.writeText(content)
            toast.success("Output copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy output to clipboard")
            console.log(error)
        }
    }

    const pasteCodeInFile = () => {
        if (activeFile) {
            const fileContent = activeFile.content
                ? `${activeFile.content}\n`
                : ""
            const content = `${fileContent}${output.replace(/```[\w]*\n?/g, "").trim()}`
            updateFileContent(activeFile.id, content)
            setActiveFile({ ...activeFile, content })
            toast.success("Code pasted successfully")

            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: content,
            })
        }
    }

    const replaceCodeInFile = () => {
        if (activeFile) {
            const isConfirmed = confirm(
                `Are you sure you want to replace the code in the file?`,
            )
            if (!isConfirmed) return
            const content = output.replace(/```[\w]*\n?/g, "").trim()
            updateFileContent(activeFile.id, content)
            setActiveFile({ ...activeFile, content })
            toast.success("Code replaced successfully")

            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: content,
            })
        }
    }

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg shadow-inner"
            style={{ height: viewHeight }}
        >
            <h1 className="text-xl font-bold text-orange-700 mb-2">Copilot</h1>

            <textarea
                className="min-h-[120px] w-full rounded-md border border-yellow-400 bg-white p-3 text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all duration-200"
                placeholder="What code do you want to generate?"
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                className="mt-1 flex w-full justify-center rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 p-2 font-bold text-black hover:opacity-90 shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={generateCode}
                disabled={isRunning}
            >
                {isRunning ? "Generating..." : "Generate Code"}
            </button>

            {output && (
                <div className="flex justify-end gap-4 pt-2">
                    <button
                        title="Copy Output"
                        onClick={copyOutput}
                        className="p-2 rounded-md bg-yellow-300 hover:bg-yellow-400 text-gray-800 transition-colors"
                    >
                        <LuCopy size={18} />
                    </button>
                    <button
                        title="Replace code in file"
                        onClick={replaceCodeInFile}
                        className="p-2 rounded-md bg-orange-300 hover:bg-orange-400 text-gray-800 transition-colors"
                    >
                        <LuRepeat size={18} />
                    </button>
                    <button
                        title="Paste code in file"
                        onClick={pasteCodeInFile}
                        className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-gray-800 transition-colors"
                    >
                        <LuClipboardPaste size={18} />
                    </button>
                </div>
            )}

            <div className="h-full rounded-lg w-full overflow-y-auto bg-white border border-yellow-300 shadow-inner p-2">
                <ReactMarkdown
                    components={{
                        code({ inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || "")
                            const language = match ? match[1] : "javascript"

                            return !inline ? (
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={language}
                                    PreTag="pre"
                                    className="!m-0 !h-full !rounded-lg !bg-gray-900 !p-2"
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code
                                    className="bg-yellow-100 text-orange-700 px-1 rounded"
                                    {...props}
                                >
                                    {children}
                                </code>
                            )
                        },
                        pre({ children }) {
                            return <pre className="h-full">{children}</pre>
                        },
                    }}
                >
                    {output}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default CopilotView
