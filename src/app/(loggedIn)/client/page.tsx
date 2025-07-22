"use client";

import { useState } from "react";

export default function ConvertPage() {
  const [format, setFormat] = useState("webm");
  const [quality, setQuality] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    setIsLoading(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const response = await fetch(
        `/convert?format=${format}&quality=${quality}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Conversion failed");
      }

      // Create a blob from the response
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `converted-video.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Video Converter
          </h1>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="format"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="webm">WebM</option>
                <option value="mp4">MP4</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="quality"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quality
              </label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Converting..." : "Convert Video"}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {downloadUrl && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800 text-sm mb-2">
                  Conversion completed successfully!
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Download Video
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
