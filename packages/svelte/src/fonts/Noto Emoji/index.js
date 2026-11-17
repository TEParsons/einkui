import regular from "./NotoEmoji-Regular.ttf?url";
import bold from "./NotoEmoji-Bold.ttf?url";


export default [
    new FontFace(
        "Noto Emoji", 
        `url(${regular})`, 
        {
            weight: 400
        }
    ),
    new FontFace(
        "Noto Emoji", 
        `url(${bold})`, 
        {
            weight: 700,
        }
    )
]