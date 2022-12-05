import React from "react";

interface Props {
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit" | "reset";
	title: string;
}

export const Button = ({ onClick, className, type, title }: Props) => {
	return (
		<button
			onClick={onClick}
			className={className}
			type={type ? type : "submit"}
		>
			{title}
		</button>
	);
};
