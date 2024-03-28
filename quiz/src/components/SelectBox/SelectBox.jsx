/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";

const SelectBox = ({ options, id, value, disptachFunction, label }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value || ""}
        onChange={(e) => dispatch(disptachFunction(e.target.value))}
        className="rounded p-1"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
