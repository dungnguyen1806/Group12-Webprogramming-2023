import React, { useState } from "react";

function EditForm({ name, value, index, setValue, onClick }) {
  const [isLabel, setIsLabel] = useState(true);

  return (
    <div onClick={onClick}>
      {isLabel ? (
        <label className="edit-label" onClick={() => {setIsLabel(false)}}>
          {value}
        </label>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="edit-input"
            name={name}
            value={value}
            onChange={(e) => setValue(index, e.target.value)}
            onBlur={() => setIsLabel(true)}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(EditForm);
