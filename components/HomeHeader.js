import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HomeHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between text-blue-900">
      <h2 className="mt-1">
        <div className="flex items-center gap-2">
          <Image
            src={session?.user?.image}
            alt="profile"
            width={25}
            height={25}
            className="h-6 w-6 rounded-full sm:hidden"
          />
          <div>
            Hello, <b>{session?.user?.name}</b>
          </div>
        </div>
      </h2>
      <div className="hidden sm:block">
        <div className="flex overflow-hidden rounded-2xl bg-gray-300 px-1 py-1 text-black">
          <Image
            src={session?.user?.image}
            alt="profile"
            width={25}
            height={25}
            className="h-6 w-6 rounded-full"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
