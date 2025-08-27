
import { useAppContext } from "@/context/AppContext"
import { useChatRoom } from "@/context/ChatContext"
import { useSocket } from "@/context/SocketContext"
import { ChatMessage } from "@/types/chat"
import { SocketEvent } from "@/types/socket"
import { formatDate } from "@/utils/formateDate"
import { FormEvent, useRef } from "react"
import { LuSendHorizonal } from "react-icons/lu"
import { v4 as uuidV4 } from "uuid"

function ChatInput() {
    const { currentUser } = useAppContext()
    const { socket } = useSocket()
    const { setMessages } = useChatRoom()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const inputVal = inputRef.current?.value.trim()

        if (inputVal && inputVal.length > 0) {
            const message: ChatMessage = {
                id: uuidV4(),
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            }
            socket.emit(SocketEvent.SEND_MESSAGE, { message })
            setMessages((messages) => [...messages, message])

            if (inputRef.current) inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between overflow-hidden rounded-lg border border-yellow-400 bg-white shadow-md"
        >
            <input
                type="text"
                className="w-full flex-grow border-none bg-transparent p-3 text-gray-800 placeholder-gray-500 outline-none"
                placeholder="Type your message..."
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-white font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                type="submit"
                title="Send"
            >
                <LuSendHorizonal size={22} />
            </button>
        </form>
    )
}

export default ChatInput
