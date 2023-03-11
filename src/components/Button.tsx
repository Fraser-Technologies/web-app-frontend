import LoadingWheel from "./loading-svg";

interface Props {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  buttonType?: "primary" | "secondary" | "tertiary";
  secondaryColor?: "black" | "white";
  buttonActionType?: "regular" | "destructive";
  title: string;
  loader?: boolean;
  size: "large" | "regular" | "small";
  iconposition?: "left" | "right";
  icon?: JSX.Element;
  active?: boolean;
}

export const FraserButton = ({
  onClick,
  className = "",
  type = "submit",
  title,
  loader = false,
  size = "regular",
  icon,
  active = true,
  iconposition = "left",
  buttonType = "primary",
  buttonActionType = "regular",
  secondaryColor = "white",
}: Props) => {
  return (
    <button
      onClick={active === false ? () => {} : onClick}
      className={`
	  ${className}
	  ${size === "large" && "px-12 py-4"} 
	  ${size === "regular" && "px-8 py-3"} 
	  ${size === "small" && "px-4 py-2"} 
	  
	  ${
      buttonType === "primary" &&
      buttonActionType !== "destructive" &&
      active !== false
        ? "bg-[#00ff6a] hover:bg-[#58FF9E]"
        : buttonType === "primary" &&
          buttonActionType !== "destructive" &&
          active === false
        ? "bg-[#f5f5f5] text-gray-500 "
        : buttonType === "primary" &&
          buttonActionType === "destructive" &&
          active !== false
        ? "bg-[#E71D36] text-white"
        : buttonType === "primary" &&
          buttonActionType === "destructive" &&
          active === false &&
          "bg-[#f5f5f5] text-gray-500"
    } 
	  ${
      buttonType === "secondary" &&
      buttonActionType !== "destructive" &&
      active !== false &&
      secondaryColor === "white"


        ? "border border-white hover:border-[#929292] text-white hover:text-[#929292]"
        : buttonType === "secondary" &&
          buttonActionType !== "destructive" &&
          active === false &&
          secondaryColor === "white"

        ? "border border-[#353535] text-[#353535]"
        : buttonType === "secondary" &&
          buttonActionType === "destructive" &&
          active !== false &&
          secondaryColor === "white"

        ? "border border-[#E71D36] text-[#E71D36]"
        : buttonType === "secondary" &&
          buttonActionType === "destructive" &&
          active === false &&
          secondaryColor === "white"


        ? "border border-[#353535] text-[#353535]"
        : buttonType === "secondary" &&
          buttonActionType !== "destructive" &&
          active !== false &&
          secondaryColor !== "white"
          
        ? "border border-black hover:border-[#929292] text-black hover:text-[#929292]"
        : buttonType === "secondary" &&
          buttonActionType !== "destructive" &&
          active === false &&
          secondaryColor !== "white"

        ? "border border-[#353535] text-[#353535]"
        : buttonType === "secondary" &&
          buttonActionType === "destructive" &&
          active !== false &&
          secondaryColor !== "white"

        ? "border border-[#E71D36] text-[#E71D36]"
        : buttonType === "secondary" &&
          buttonActionType === "destructive" &&
          active === false &&
          secondaryColor !== "white"
          
        ? "border border-[#353535] text-[#353535]"
        : buttonType === "secondary" &&
          "border border-black hover:border-[#929292] text-black hover:text-[#929292]"
    } 
	  
	
    font-medium text-[16px] flex items-center flex justify-center rounded-md`}
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
