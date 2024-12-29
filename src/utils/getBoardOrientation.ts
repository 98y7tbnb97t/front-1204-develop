export default function getBoardOrientation(fen: string) {
    if (!fen) {
        return "white";
    }
    const parts = fen.split(" ");
    if (parts.length < 2) {
        return "white";
    }
    const activeColor = parts[1]; // Extract active color ('w' or 'b')

    if (activeColor === "w") {
        return "white"; // White at the bottom
    } else if (activeColor === "b") {
        return "black"; // Black at the bottom
    } else {
        return "white";
    }
}