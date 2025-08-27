

import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    return (
        <div
            className="flex flex-col items-center gap-3 p-4 bg-gradient-to-b from-yellow-50 via-orange-100 to-yellow-50"
            style={{ height: viewHeight }}
        >
            <h1 className="text-2xl font-bold text-orange-700">Run Code</h1>
            <div className="flex h-[90%] w-full flex-col items-end gap-3 md:h-[92%]">
                {/* Language Dropdown */}
                <div className="relative w-full">
                    <select
                        className="w-full rounded-md border border-orange-400 bg-yellow-50 px-4 py-2 text-orange-700 outline-none focus:ring-2 focus:ring-orange-400"
                        value={JSON.stringify(selectedLanguage)}
                        onChange={handleLanguageChange}
                    >
                        {supportedLanguages
                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                            .map((lang, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={JSON.stringify(lang)}
                                        className="bg-yellow-50 text-orange-700"
                                    >
                                        {lang.language +
                                            (lang.version
                                                ? ` (${lang.version})`
                                                : "")}
                                    </option>
                                )
                            })}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="absolute bottom-3 right-4 z-10 text-orange-500"
                    />
                </div>

                {/* Input Textarea */}
                <textarea
                    className="min-h-[120px] w-full resize-none rounded-md border border-orange-400 bg-yellow-50 p-2 text-orange-700 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Write your input here..."
                    onChange={(e) => setInput(e.target.value)}
                />

                {/* Run Button */}
                <button
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 p-2 font-bold text-white shadow-md transition hover:from-orange-500 hover:to-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={runCode}
                    disabled={isRunning}
                >
                    {isRunning ? "Running..." : "Run"}
                </button>

                {/* Output Section */}
                <label className="flex w-full justify-between text-orange-700 font-semibold">
                    Output:
                    <button onClick={copyOutput} title="Copy Output">
                        <LuCopy
                            size={18}
                            className="cursor-pointer text-orange-500 hover:text-orange-600"
                        />
                    </button>
                </label>
                <div className="w-full flex-grow overflow-y-auto rounded-md border border-orange-400 bg-yellow-50 p-2 text-orange-700">
                    <code>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </code>
                </div>
            </div>
        </div>
    )
}

export default RunView
