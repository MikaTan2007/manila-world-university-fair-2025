import React from "react";

export function HomepageSkeletonLoad() {
    return (
        <div role="status" className="w-full border border-gray-200 rounded-lg shadow-sm animate-pulse hover:shadow-lg transition-shadow font-mons bg-white dark:bg-gray-800 dark:border-gray-700">
            {/* Header Section */}
            <div className="p-6 pb-0">
                {/* University Name */}
                <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                {/* Location Info */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-2/3"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 py-4">
                <div className="space-y-4">
                    <div className="flex flex-col">
                        {/* Contact Information Label */}
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-40 mb-2"></div>
                        {/* Representative Name */}
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-48 mb-2"></div>
                        {/* Representative Email */}
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-56"></div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-end p-6 pt-0">
                <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-20"></div>
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    )
}