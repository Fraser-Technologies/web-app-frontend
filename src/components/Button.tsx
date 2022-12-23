import React from "react";
import { Spinner } from "react-bootstrap";

interface Props {
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit" | "reset";
	title: string;
	loader?: boolean;
}

export const Button = ({ onClick, className, type, title, loader }: Props) => {
	return (
		<button
			onClick={onClick}
			className={className}
			type={type ? type : "submit"}>
			{title}{" "}
			<span>
				{" "}
				{loader && (
					<Spinner role="status" className="spinner-border text-white" />
				)}
			</span>
		</button>
	);
};
