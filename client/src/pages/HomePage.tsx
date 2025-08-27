import desktop from "@/assets/desk_img.jpg"
import FormComponent from "../components/forms/FormComponent"

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-yellow-100 via-yellow-50 to-white px-6 text-gray-800 sm:px-12">
            {/* Header Section */}
            <header className="w-full max-w-6xl py-10 text-center animate-fadeIn">
                <h1 className="text-5xl font-extrabold mb-4 text-orange-500 drop-shadow-md transition-transform duration-500 hover:scale-105">
                    Welcome to Dev-Mate
                </h1>
                <p className="text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
                    Collaborate in real-time, share ideas, and build amazing projects together.
                </p>
            </header>

            {/* Main Content */}
            <div className="my-12 flex w-full max-w-6xl flex-col items-center justify-evenly gap-12 rounded-xl bg-yellow-50 p-8 shadow-lg sm:flex-row sm:gap-16 transition-transform duration-500 hover:scale-[1.02]">
                <div className="flex w-full flex-col items-center sm:w-1/2 animate-fadeIn">
                    <img
                        src={desktop}
                        alt="Dev-Mate"
                        className="mx-auto mb-6 w-[280px] rounded-xl shadow-xl sm:w-[400px] transition-transform duration-500 hover:scale-105"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Why Choose Dev-Mate?</h2>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                            Dev-Mate makes collaborative coding effortless. Create rooms, share your unique ID, and start coding live with your friends or team members without any hassle.
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center sm:w-1/2 animate-slideIn">
                    <FormComponent />
                </div>
            </div>

            {/* Features Section */}
            <section className="w-full max-w-6xl my-16 grid grid-cols-1 gap-8 px-4 sm:grid-cols-3 animate-fadeIn">
                {[
                    {
                        title: "Real-Time Collaboration",
                        desc: "Work together on the same code in real-time, without delays or conflicts.",
                    },
                    {
                        title: "Simple Room System",
                        desc: "Generate a unique room ID in one click and invite your team effortlessly.",
                    },
                    {
                        title: "Secure & Reliable",
                        desc: "End-to-end encrypted sessions for safe and reliable collaboration.",
                    },
                ].map((feature, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl bg-white border border-yellow-300 p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                        <h3 className="text-xl font-bold mb-2 text-orange-500">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="w-full max-w-6xl py-6 text-center text-gray-600 border-t border-yellow-200 animate-fadeIn">
                © {new Date().getFullYear()} Dev-Mate. All rights reserved.
            </footer>
        </div>
    )
}

export default HomePage
