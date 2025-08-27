
import { useAppContext } from "@/context/AppContext"
import { RemoteUser, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"

function Users() {
    const { users } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-4">
            <div className="flex h-full w-full flex-wrap items-start gap-x-4 gap-y-6">
                {users.map((user) => (
                    <User key={user.socketId} user={user} />
                ))}
            </div>
        </div>
    )
}

const User = ({ user }: { user: RemoteUser }) => {
    const { username, status } = user
    const isOnline = status === USER_CONNECTION_STATUS.ONLINE
    const title = `${username} - ${isOnline ? "Online" : "Offline"}`

    return (
        <div
            className="relative flex w-[110px] flex-col items-center gap-2 rounded-xl bg-gradient-to-b from-yellow-300 to-orange-500 p-3 shadow-md hover:scale-105 transition-transform duration-300"
            title={title}
        >
            <Avatar
                name={username}
                size="55"
                round="14px"
                title={title}
                color={isOnline ? "#f59e0b" : "#d97706"} // Orange tones for avatar background
            />
            <p className="line-clamp-2 max-w-full text-center text-sm font-semibold text-black break-words">
                {username}
            </p>
            <div
                className={`absolute right-3 top-3 h-3 w-3 rounded-full border-2 border-white ${
                    isOnline ? "bg-green-500" : "bg-red-500"
                }`}
            ></div>
        </div>
    )
}

export default Users
