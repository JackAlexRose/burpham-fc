"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

export function ImageCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    // Reset autoplay when the component mounts
    api.plugins().autoplay.reset();
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full h-fit"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="h-full">
            <Image
              width={800}
              height={800}
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
