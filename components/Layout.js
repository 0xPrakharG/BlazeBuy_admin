import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-blue-900">
        <div className="w-full text-center">
          <button
            className="rounded-lg bg-white p-2 px-4"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-blue-900">
      <Nav />
      <div className="mb-0 mr-2 mt-2 flex-grow rounded-lg bg-white p-4">
        {children}
      </div>
    </div>
  );
}
