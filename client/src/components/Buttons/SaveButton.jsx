import { BookmarkIcon } from "@heroicons/react/24/outline";

const SaveButton = ({ size = "size-5", onClick, isSaved }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <span
      onClick={handleClick}
      className="group inline-flex items-center justify-center bg-emerald-600/15 hover:bg-primary/40 rounded-sm p-1 shadow-sm hover-transition cursor-pointer"
    >
      {isSaved ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#059669"
          className={size}
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <BookmarkIcon
          className={`text-primary group-hover:text-white ${size} stroke-2`}
        />
      )}
    </span>
  );
};

export default SaveButton;
