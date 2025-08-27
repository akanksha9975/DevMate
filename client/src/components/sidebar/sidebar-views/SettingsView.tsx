

import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        showGitHubCorner,
        setShowGitHubCorner,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))
    const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) =>
        setShowGitHubCorner(e.target.checked)

    useEffect(() => {
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col items-center gap-4 p-4 bg-gradient-to-b from-yellow-50 via-orange-100 to-yellow-50"
            style={{ height: viewHeight }}
        >
            <h1 className="text-2xl font-bold text-orange-700">Settings</h1>

            {/* Font settings */}
            <div className="flex w-full items-end gap-2">
                <Select
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                    options={editorFonts}
                    title="Font Family"
                />
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="rounded-md border border-orange-400 bg-yellow-50 px-4 py-2 text-orange-700 outline-none focus:ring-2 focus:ring-orange-400"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => (
                        <option
                            key={size}
                            value={size + 12}
                            className="bg-yellow-50 text-orange-700"
                        >
                            {size + 12}
                        </option>
                    ))}
                </select>
            </div>

            {/* Theme selector */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />

            {/* Language selector */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={langNames}
                title="Language"
            />

            {/* GitHub Corner Toggle */}
            <div className="mt-4 flex w-full items-center justify-between text-orange-700 font-semibold">
                <label>Show GitHub corner</label>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        onChange={handleShowGitHubCornerChange}
                        checked={showGitHubCorner}
                    />
                    <div className="peer h-6 w-12 rounded-full bg-yellow-200 outline-none duration-300 after:absolute after:left-1 after:top-1 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-white after:shadow-md after:duration-300 peer-checked:bg-orange-400 peer-checked:after:translate-x-6"></div>
                </label>
            </div>

            {/* Reset button */}
            <button
                className="mt-auto w-full rounded-md bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 font-bold text-white shadow-md transition hover:from-orange-500 hover:to-yellow-500"
                onClick={resetSettings}
            >
                Reset to default
            </button>
        </div>
    )
}

export default SettingsView
