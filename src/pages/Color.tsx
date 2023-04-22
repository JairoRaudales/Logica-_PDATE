import React from "react";

import { 
    useState 
    , useEffect
} from "react";

import {
  ColorType,
  getColors,
  addColor,
  deleteColor,
  updateColor,
} from "../services/ColorServices";

function Color() {
  const [colors, setColors] = useState<ColorType[]>([]);
  const [color, setColor] = useState<string>("");
  const [editingColor, setEditingColor] = useState<ColorType | null>(null);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const addColorEvent = async () => {
    const newColor = await addColor(color);
    setColors([...colors, newColor]);
    setColor("");
  };

  const deleteColorEvent = async (id: number) => {
    await deleteColor(id);
    setColors(colors.filter((color) => color.id !== id));
  };

  const editColorEvent = (color: ColorType) => {
    setEditingColor(color);
    setShowUpdateButton(true);
  };

  const updateColorEvent = async () => {
    if (!editingColor) return;
    const updatedColor = await updateColor(editingColor);
    setEditingColor(null);
    setColors(
      colors.map((color) => (color.id === updatedColor.id ? updatedColor : color))
    );
    setShowUpdateButton(false);
  };

  const cancelUpdateEvent = () => {
    setEditingColor(null);
    setShowUpdateButton(false);
  };

  useEffect(() => {
    async function fetchData() {
      const x = await getColors();
      setColors(x);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Colors Management</h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Color:</span>
        <input
          type="text"
          placeholder="type your new color"
          value={color}
          onChange={changeInput}
        />
        <button disabled={color.length === 0} onClick={addColorEvent}>
          Add
        </button>

        {showUpdateButton && (
          <>
            <button onClick={updateColorEvent}>Update</button>
            <button onClick={cancelUpdateEvent}>Cancel</button>
          </>
        )}
      </div>

      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            {editingColor?.id === color.id ? (
              <>
                <input
                  type="text"
                  value={editingColor.descripcion}
                  onChange={(e) =>
                    setEditingColor({ ...editingColor, descripcion: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                {color.descripcion}
                <button onClick={() => deleteColorEvent(color.id)}>Remove</button>
                <button onClick={() => editColorEvent(color)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Color;

