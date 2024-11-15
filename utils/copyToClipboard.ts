export const copyToClipboard = (text: any) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
    } else {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // Cho một số trình duyệt cũ
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        console.log("Copied to clipboard using fallback:", text);
    }
}