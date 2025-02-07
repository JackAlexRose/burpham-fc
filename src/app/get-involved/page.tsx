import { Button } from "@/components/ui/button";
import { Instagram, Mail, Youtube } from "lucide-react";
import Link from "next/link";

export default function GetInvolved() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">Get Involved</h1>
      <p className="mb-8 text-zinc-300">
        Burpham Football Club is always looking for new players, coaches, and
        volunteers to join our team. Whether you&apos;re an experienced player
        or a complete beginner, we have a place for you at our club. Get in
        touch today to find out how you can get involved and help us continue
        our success on and off the pitch.
      </p>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Connect with Us
        </h2>
        <div className="flex space-x-4">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-burpham-green bg-zinc-200"
          >
            <Link
              href="https://www.instagram.com/burphamfc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="hover:bg-burpham-yellow bg-zinc-200"
          >
            <Link
              href="https://www.youtube.com/@BurphamFC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="mr-2 h-4 w-4" />
              YouTube
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
