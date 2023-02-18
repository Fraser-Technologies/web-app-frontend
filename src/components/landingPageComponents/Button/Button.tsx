import "./Button.css";

const Button = ({
	className,
	onClick,
	buttonText,
	buttonIcon,
}: {
	className: string;
	onClick: () => void;
	buttonText: string;
	buttonIcon: any;
}) => {
	return (
		<>
			<button type="button" className={className} onClick={onClick}>
				<span className={buttonIcon ? "button__text text-pad" : "button__text"}>
					{buttonText}
				</span>
				<span className="button__icon">{buttonIcon}</span>
			</button>
		</>
	);
};

export default Button;
