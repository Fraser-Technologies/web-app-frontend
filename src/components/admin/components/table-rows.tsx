import { FaEllipsisV } from "react-icons/fa";


//TABLE ROW UI
const rowRenderer = ({
	data,
	index,
	handleOpenModal,
	handleSetMenuToggle,
	menuToggle,
	menuVisible,
	handleOpenDeleteModal,
	setFlip,
}: {
	data: any;
	index: any;
	handleOpenModal: any;
	handleSetMenuToggle: any;
	menuToggle: any;
	menuVisible: any;
	handleOpenDeleteModal: any;
	setFlip: any;
}) => {
	return (
		<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
			<td
				onClick={() => handleOpenModal(data, "info")}
				className="px-4 py-4 text-xs font-normal text-gray-700">
				{data?.travel_destination?.from?.name}
			</td>
			<td className="text-xs font-normal text-gray-700 ">
				{data?.travel_destination?.to?.name}
			</td>
			<td
				onClick={() => handleOpenModal(data, "info")}
				className="px-4 py-4 text-xs font-normal text-gray-700">
				{data?.arrival_date}
			</td>
			<td
				onClick={() => handleOpenModal(data, "info")}
				className="px-4 py-4 text-xs font-normal text-gray-700">
				{data?.arrival_time}
			</td>
			<td
				onClick={() => handleOpenModal(data, "info")}
				className="px-4 py-4 text-xs font-normal text-gray-700">
				{`${data?.driver?.first_name} ${data?.driver?.last_name}`}
			</td>
			<td
				onClick={() => handleOpenModal(data, "info")}
				className="px-4 py-4 text-xs font-normal text-gray-700">
				{data?.bus?.name}
			</td>
			<td
				scope="row"
				className="px-4 py-6 text-xs font-normal text-gray-700"
				onClick={() => handleSetMenuToggle(index.toString())}>
				<div>
					<FaEllipsisV />
				</div>
				{menuToggle === index.toString()
					? menuVisible && (
							<ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
								<li
									onClick={() => handleOpenModal(data, "info")}
									className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
									View
								</li>
								<li
									onClick={() => handleOpenModal(data, "edit")}
									className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
									Edit
								</li>
								<li
									onClick={() => {
										setFlip("delete");
										handleOpenDeleteModal(data);
									}}
									className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
									Delete
								</li>
							</ul>
					  )
					: ""}
			</td>
		</tr>
	);
};

export default rowRenderer;
