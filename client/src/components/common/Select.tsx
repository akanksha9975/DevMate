

import { ChangeEvent } from "react"
import { PiCaretDownBold } from "react-icons/pi"

interface SelectProps {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    value: string
    options: string[]
    title: string
}

function Select({ onChange, value, options, title }: SelectProps) {
    return (
        <div className="relative w-full">
            <label className="mb-2 block text-sm font-semibold text-gray-800">{title}</label>
            <select
                className="w-full appearance-none rounded-md border-none bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 text-black font-medium outline-none shadow-md hover:opacity-90 transition-all duration-300"
                value={value}
                onChange={onChange}
            >
                {options.sort().map((option) => {
                    const value = option
                    const name =
                        option.charAt(0).toUpperCase() + option.slice(1)

                    return (
                        <option key={name} value={value} className="bg-white text-black">
                            {name}
                        </option>
                    )
                })}
            </select>
            <PiCaretDownBold
                size={18}
                className="absolute bottom-3 right-4 z-10 text-black pointer-events-none"
            />
        </div>
    )
}

export default Select
