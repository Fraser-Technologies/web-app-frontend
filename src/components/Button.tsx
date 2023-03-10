import LoadingWheel from "./loading-svg";

interface Props {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  title: string;
  loader?: boolean;
  size: "large" | "regular" | "small";
  iconposition?: "left" | "right";
  icon?: JSX.Element;
  active?: boolean;
  
}

export const FraserButton = ({
  onClick,
  className,
  type,
  title,
  loader,
  size,
  icon,
  active,
  iconposition,
}: Props) => {
  return (
    <button
      onClick={active === false ? () => {} : onClick}
      className={`
	  ${className}
	  ${size === "large" && "px-12 py-4"} 
	  ${size === "regular" && "px-8 py-3"} 
	  ${size === "small" && "px-4 py-2"} 
	  font-medium 
	  
	  ${
      active === false
        ? "bg-[#f5f5f5] text-gray-500 "
        : "bg-[#00ff6a] hover:bg-[#58FF9E]"
    } 
	
	flex items-center flex justify-center rounded-md`}
      type={type ? type : "submit"}
    >
      {loader
        ? iconposition === "left" && <LoadingWheel param={loader} />
        : iconposition === "left" && icon && <span>{icon}</span>}
      <div
        className={`${iconposition === "right" && "mr-2"} ${
          iconposition === "left" && "ml-2"
        }`}
      >
        {title}
      </div>
      {loader
        ? iconposition === "right" && <LoadingWheel param={loader} />
        : iconposition === "right" && icon && <span>{icon}</span>}
    </button>
  );
};
