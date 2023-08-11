import React from "react";
import { to_title } from "../assets/js/utils/functions";

const Checkbox = ({
  title,
  no_capitalise,
  type,
  style,
  name,
  _id,
  action,
  disabled,
  component,
  checked,
}) => {
  return (
    <span className="" key={_id}>
      <input
        id={_id}
        className="checkbox-custom"
        name={name}
        type={type || "checkbox"}
        checked={checked}
        onChange={() => !disabled && action(_id)}
      />
      <label style={{ ...style }} for={_id} className="checkbox-custom-label">
        {no_capitalise ? title : to_title(title)}
      </label>
    </span>
  );
};

export default Checkbox;
