"use client";

import { X, Share2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function BiographyModal({ isOpen, onClose, article }) {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent className="max-w-4xl p-0 bg-background border-none overflow-hidden max-h-[90vh] overflow-y-auto sm:mx-4">
        <DialogTitle></DialogTitle>
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Share Button */}
          {/* <button className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full">
            <Share2 className="h-5 w-5 text-white" />
          </button> */}

          {/* News Image */}
          <Image
            src={article.image || "/placeholder.svg?height=600&width=1200"}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div className="p-4 sm:p-6">
          {/* News Category */}
          {/* <div className="bg-[#ff6b5b]/10 text-[#ff6b5b] px-3 py-1 rounded-full text-sm inline-block mb-2">
            {article.category || "General"}
          </div> */}

          {/* News Title */}
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>

          {/* Author & Timestamp */}
          <div className="flex items-center gap-2 mb-6">
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lap%20blog.png-ENg7PcZ1J39E2MFk7IZ7B0W6YoPGQA.jpeg"
              alt="Bloggerism Logo"
              width={30}
              height={30}
              className="h-8 w-auto"
            /> */}
            <div>
              <div className="font-medium">
                {article.source?.title || "Unknown Source"}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(article.dateTimePub).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* News Content */}
          <div className="space-y-6">
            <div>
              {/* <h3 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">
                News Details:
              </h3> */}
              <p className="text-lg">
                {article.body
                  ? article.body.split(" ").slice(0, 200).join(" ") + "..."
                  : "Full content not available. Click below for more details."}
              </p>
            </div>

            {/* Read More Link */}
            <div className="text-center mt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b5b] font-semibold underline hover:no-underline"
              >
                Read Full Article
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
