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
  index: number;
  handleOpenModal: any;
  handleSetMenuToggle: any;
  menuToggle: any;
  menuVisible: any;
  handleOpenDeleteModal: any;
  setFlip: any;
}) => {
  const item = data[index];

  return (
    <tr className="bg-white border-b border-slate-100 hover:bg-gray-50 cursor-pointer">
      <td
        scope="row"
        onClick={() => handleOpenModal(item, "info")}
        className="font-normal text-xs text-gray-700 py-4 px-4"
      >
        {item.startCity}
      </td>
      <td scope="row" className=" font-normal text-xs text-gray-700 ">
        {item.destinationCity}
      </td>
      <td
        scope="row"
        onClick={() => handleOpenModal(item, "info")}
        className="font-normal text-xs text-gray-700 py-4 px-4"
      >
        {item.date}
      </td>
      <td
        scope="row"
        onClick={() => handleOpenModal(item, "info")}
        className="font-normal text-xs text-gray-700 py-4 px-4"
      >
        {item.time}
      </td>
      <td
        scope="row"
        onClick={() => handleOpenModal(item, "info")}
        className="font-normal text-xs text-gray-700 py-4 px-4"
      >
        {item.driver}
      </td>
      <td
        scope="row"
        onClick={() => handleOpenModal(item, "info")}
        className="font-normal text-xs text-gray-700 py-4 px-4"
      >
        {item.vehicle}
      </td>
      <td
        scope="row"
        className="py-6 px-4 font-normal text-xs text-gray-700"
        onClick={() => handleSetMenuToggle(index.toString())}
      >
        <div>
          <FaEllipsisV />
        </div>
        {menuToggle === index.toString()
          ? menuVisible && (
              <ul className="bg-white border rounded-md shadow-md absolute z-10 mt-2 py-2">
                <li
                  onClick={() => handleOpenModal(item, "info")}
                  className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                >
                  View
                </li>
                <li
                  onClick={() => handleOpenModal(item, "edit")}
                  className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </li>
                <li
                  onClick={() => {
                    setFlip("delete");
                    handleOpenDeleteModal(item);
                  }}
                  className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                >
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
