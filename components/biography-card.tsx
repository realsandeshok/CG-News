"use client";

import Image from "next/image";
import { useState } from "react";
import BiographyModal from "./biography-modal";
import { useIsMobile } from "./useIsMobile";

export default function BiographyCard({ article }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={`relative rounded-lg overflow-hidden group cursor-pointer snap-center flex-shrink-0 w-full ${
          isMobile ? "h-[90vh]" : ""
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* News Source (instead of category, since the API doesn't provide category) */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm z-10">
          {article.source?.title || "Unknown Source"}
        </div>

        {/* News Image */}
        <Image
          src={article.image || "/placeholder.svg?height=400&width=600"}
          alt={article.title || "No Title Available"}
          width={600}
          height={400}
          className="w-full h-[650px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105 z-0"
        />

        {/* News Details */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-xl font-bold">
            {article.title || "Untitled News"}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {new Date(article.dateTimePub).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Modal for Full News Details */}
      <BiographyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={article}
      />
    </>
  );
}
