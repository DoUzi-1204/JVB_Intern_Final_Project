import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DropDown = ({
  label,
  items,
  isOpen,
  toggle,
  onClose,
  loading,
  refEl,
  type,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative" ref={refEl}>
    {/* Trigger dropdown */}
    <div
      className="flex items-center gap-1 text-white text-sm font-normal cursor-pointer px-3 py-2 rounded-md hover:text-yellow-400 transition-all duration-300"
      onClick={toggle}
    >
      <span>{label}</span>
      <FontAwesomeIcon
        icon={faCaretDown}
        className={`text-[12px] transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>

    {/* Dropdown menu */}
    {isOpen && (
      <div
        className={`absolute top-full left-0 mt-2 ${
          type === "genre" ? "w-[650px] max-sm:w-[90vw]" : "w-[300px]"
        } bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm`}
      >
        <div className="p-4">
          {loading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="mt-2 text-sm">Đang tải {label.toLowerCase()}...</p>
            </div>
          ) : (
            <div
              className={`grid gap-1 ${
                type === "genre"
                  ? "grid-cols-3 max-sm:grid-cols-2 max-sm:overflow-y-auto max-sm:max-h-[200px]"
                  : "grid-cols-2"
              }`}
            >
              {items.map((item) => {
                const url =
                  type === "genre"
                    ? `/filter?genres=${item.id}`
                    : `/filter?countries=${item.iso_3166_1}`;
                return (
                  <a
                    key={item.id || item.iso_3166_1}
                    href={url}
                    className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block truncate"
                    style={{ maxWidth: "100%" }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Close dropdown then navigate
                      if (onClose) onClose();
                      navigate(url);
                    }}
                  >
                    <span
                      className="truncate block w-full"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    )}
      </div>
  );
};

export default DropDown;
