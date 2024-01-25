import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-bgGray">
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
    <div className="min-h-screen bg-bgGray">
      <div className="flex items-center p-4 md:hidden">
        <button onClick={() => setShowNav((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="mr-6 flex grow justify-center">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} setShow={setShowNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
