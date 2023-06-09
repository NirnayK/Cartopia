import { NavBar } from "@/components/NavBar";

export default function AdminLayout({ children }) {
    return (
        <section className="bg-blue-500 min-h-screen flex">
            <NavBar />
            <section className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
                {children}
            </section>
        </section>
    )
}