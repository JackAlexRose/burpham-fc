import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";

export default function GetInvolved() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">Get Involved</h1>
      <p className="mb-8 text-zinc-300">
        Burpham Football Club is always looking for new players, coaches, and
        volunteers to join our team. Whether you&apos;re an experienced player
        or a complete beginner, we have a place for you at our club.
      </p>
      <p className="mb-8 text-zinc-300">
        We train every week on Wednesdays at 7:30pm - 9pm at George Abbot School
        in Burpham. If you&apos;re interested in playing, please come along to
        one of our training sessions or get in touch with us via email or social
        media.
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
          <Button
            asChild
            variant="ghost"
            className="hover:bg-burpham-green bg-zinc-200"
          >
            <Link
              href="mailto:" // Add your email address here
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="mr-2 h-4 w-4" />
              burphamfc@gmail.com
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
