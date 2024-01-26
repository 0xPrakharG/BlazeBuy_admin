import Image from "next/image";
import Link from "next/link";
import Cart from "@/public/cart.png";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image src={Cart} alt="" width={30} height={30} />
      <span>BlazeBuyAdmin</span>
    </Link>
  );
}
