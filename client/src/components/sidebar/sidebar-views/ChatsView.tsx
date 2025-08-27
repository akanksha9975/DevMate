

import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"
import useResponsive from "@/hooks/useResponsive"

const ChatsView = () => {
    const { viewHeight } = useResponsive()

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-4 rounded-lg border border-yellow-400 bg-gradient-to-br from-yellow-300 to-orange-400 p-4 shadow-lg"
            style={{ height: viewHeight }}
        >
            <h1 className="text-2xl font-bold text-orange-800 drop-shadow">
                Group Chat
            </h1>

            <div className="flex-1 overflow-y-auto rounded-md bg-white/80 p-3 shadow-inner">
                <ChatList />
            </div>

            <div className="mt-2">
                <ChatInput />
            </div>
        </div>
    )
}

export default ChatsView
