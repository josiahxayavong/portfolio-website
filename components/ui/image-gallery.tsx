/* this tells Next.js that this file must run on the client side.
it's required for using 'useState' to manage which image is selected
and for handling click events to open/close the modal. */
"use client"

// importing 'useState' hook from React and the 'X' icon
import { useState } from "react"
import { X } from "lucide-react"

// defining the props for this component. it expects an array of image objects.
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption: string
  }>
}

// main ImageGallery component
export function ImageGallery({ images }: ImageGalleryProps) {
  // state to keep track of the selected image's index.
  // 'null' means no image is selected and the modal is closed.
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // sets the selected image index to open the modal
  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  // closes the modal by resetting the selected image to null
  const closeModal = () => {
    setSelectedImage(null)
  }

  // navigates to the next image in the array, looping back to the start
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  // navigates to the previous image, looping to the end if at the start
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  // the main return statement renders the gallery grid and the modal
  return (
    <>
      {/* this is the grid of thumbnail images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="space-y-2">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="rounded-lg border border-gray-700 aspect-[16/10] object-cover w-full cursor-pointer hover:opacity-80 transition-opacity"
              width={300}
              height={188}
              onClick={() => openModal(index)}
            />
            <p className="text-xs text-gray-400 text-center">{image.caption}</p>
          </div>
        ))}
      </div>

      {/* Modal: this part only renders if an image is selected */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // clicking the background closes the modal
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation() // prevents the background click from closing the modal
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <img
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} // clicking the image itself doesn't close the modal
              />
            </div>

            {/* Caption and counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg max-w-[90vw]">
              <p className="text-sm text-center">{images[selectedImage].caption}</p>
              <p className="text-xs text-gray-300 text-center mt-1">
                {selectedImage + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
