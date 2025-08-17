import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DropDown = ({
  label,
  items,
  isOpen,
  toggle,
  onClose,
  loading,
  refEl,
  type,
}) => (
  <div className="relative" ref={refEl}>
                  <div className="relative group w-full">
                    <Link
                      key={item.id || item.iso_3166_1}
                      to={`/${type}/${item.id || item.iso_3166_1}`}
                      className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block truncate w-full"
                      style={{maxWidth: '100%'}}
                      onClick={onClose}
                    >
                      <span className="truncate block w-full" style={{maxWidth: '100%'}}>{item.name}</span>
                    </Link>
                    <div className="absolute left-0 top-full mt-1 w-max max-w-xs bg-zinc-800 text-white text-xs rounded shadow-lg px-2 py-1 z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-pre-line">
                      {item.name}
                    </div>
                  </div>
        }`}
      />
    </div>
    {isOpen && (
      <div className="absolute top-full left-0 mt-2 w-[500px] bg-zinc-900/90 border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
        <div className="p-4">
          {loading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="mt-2 text-sm">Đang tải {label.toLowerCase()}...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {items.map((item) => (
                <Link
                  key={item.id || item.iso_3166_1}
                  to={`/${type}/${item.id || item.iso_3166_1}`}
                  className="text-left text-white text-sm py-2 px-3 hover:text-yellow-400 transition-colors duration-200 block truncate"
                  style={{ maxWidth: "100%" }}
                  onClick={onClose}
                >
                  <span
                    className="truncate block w-full"
                    style={{ maxWidth: "100%" }}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export default DropDown;
