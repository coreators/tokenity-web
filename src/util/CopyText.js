const CopyText = (text) => {
    // let input = document.createElement("input");
    // input.type = "text";
    // input.value = text;
    // // input.select();
    // navigator.clipboard.writeText(input.value);

    navigator.clipboard.writeText(text);
}

export default CopyText;
