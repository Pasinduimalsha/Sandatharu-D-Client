import React from "react";

const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
                <svg
                    key={index}
                    className={`h-5 w-5 fill-current ${
                        index <= filledStars
                            ? "text-yellow-500"
                            : hasHalfStar && index === filledStars + 1
                            ? "text-yellow-500"
                            : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 0l2.39 6.14 6.37.51-5.1 3.95 1.82 6.3-5.84-4.33-5.84 4.33 1.82-6.3-5.1-3.95 6.37-.51L10 0zm0 1.5L7.69 6.2l-4.37.35 3.51 2.71-1.29 4.46 3.29-2.44 3.29 2.44-1.29-4.46 3.51-2.71-4.37-.35L10 1.5z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
