'use client'

import { useCallback, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import Spline from '@splinetool/react-spline'

// Define the ImageData Interface

interface ImageData {
    id: string;
    urls: {
        thumb:string;
    };
    alt_description:string;
    description:string;
    user: {
        name:string
    }
}

export default function ImageSlider() {
    // State to manage the images fetched from the API
    const [images, setImages] = useState<ImageData[]>([]);
    // State to manage the current image index in the carousel
    const[currentIndex, setCurrentIndex] =useState<number>(0);
    // State to manage the play/pause status of the carousel
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    // Interval for the carousel autoplay
    const interval = 3000; 

    // Function to fetch images from Unsplash API
    const fetchImages = async () => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&per_page=15`
            )
            const data = await response.json()
            setImages(data)
        }
        catch(error){
            console.log(`Error fetching Images: ${error}`)
        }
    };

    // useEffect to fetch images when the component mounts
    useEffect(() => {
        fetchImages();
    }, [])

    // Function to go to the next image
    const nextImage = useCallback(():void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    // useEffect to handle the autoplay functionality
    useEffect(() => {
        if(isPlaying){
            const id = setInterval(nextImage, interval);
            return () => clearInterval(id);
        }
    }, [isPlaying, nextImage])

    // Function to toggle play/pause status
    const togglePlayPause = ():void => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    }

    // JSX return statement rendering the Image Slider UI
  return (
    <>
    <div className=" relative flex items-center justify-center min-h-screen bg-gray-50 z-999">
        <div className="w-full max-w-2xl sm:mx-auto mx-2">
            <h1 className="text-3xl font-bold text-center mb-4">Image Slider</h1>
            <p className="text-center font-semibold mb-8">
            A simple dynamic image slider/carousel with Unsplash.
            </p>

            <Carousel className="rounded-xl overflow-hidden shadow-lg">
            <CarouselContent>
                {images.map((image, index) => (
                <CarouselItem
                    key={image.id}
                    className={index === currentIndex ? "block" : "hidden"}
                >
                    <div className="relative w-full h-[400px] bg-white/30 backdrop-blur-lg flex items-center justify-center ">
                    <Image
                        src={image.urls.thumb}
                        alt={image.alt_description || "Unsplash image"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={index === 0}
                    />
                    </div>

                    <div className="p-3 bg-white/30 text-center backdrop-blur-lg ">
                        <h2 className="text-lg font-semibold">{image.user.name}</h2>
                        <p className="text-sm text-gray-700">
                            {image.description || image.alt_description}
                        </p>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>

            <div className=" flex items-center justify-center gap-2 py-2 z-999 bg-white/30 backdrop-blur-lg">
                <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="bg-purple-700/30 backdrop:blur-lg border-white hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 ease-in-out"
                >
                {isPlaying ? (
                    <PauseIcon className="w-6 h-6 text-gray-800" />
                ) : (
                    <PlayIcon className="w-6 h-6 text-gray-800" />
                )}
                <span className="sr-only ">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
            </div>
            </Carousel>
        </div>
        <div className="absolute -z-10 size w-screen h-screen">
            <Spline
            scene="https://prod.spline.design/OMvByUw0AZOHqpBs/scene.splinecode" 
            />
        </div>
        
    </div>

    </>
  )
}
