const addBtn = document.getElementById("addField");
const fieldLabelInput = document.getElementById("fieldLabel");
const fieldTypeSelect = document.getElementById("fieldType");
const formPreview = document.getElementById("formPreview");

let fieldCount = 0;

addBtn.addEventListener("click", () => {
  const labelText = fieldLabelInput.value.trim();
  const fieldType = fieldTypeSelect.value;

  if (!labelText) {
    alert("Please enter a label.");
    return;
  }

  fieldCount++;
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add("field");

  const label = document.createElement("label");
  label.innerText = labelText;
  label.setAttribute("for", `field_${fieldCount}`);

  let input;

  if (fieldType === "text") {
    input = document.createElement("input");
    input.type = "text";
    input.id = `field_${fieldCount}`;
  } else if (fieldType === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
    input.id = `field_${fieldCount}`;
  } else if (fieldType === "radio") {
    input = document.createElement("input");
    input.type = "radio";
    input.name = "radioGroup";
    input.id = `field_${fieldCount}`;
  }

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);

  formPreview.appendChild(fieldWrapper);

  fieldLabelInput.value = "";
});
