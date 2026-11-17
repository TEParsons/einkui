import regular from "./Lora-Regular.ttf?url";
import italic from "./Lora-Italic.ttf?url";
import bold from "./Lora-Bold.ttf?url";
import bolditalic from "./Lora-BoldItalic.ttf?url";


export default [
    new FontFace(
        "Lora", 
        `url(${regular})`, 
        {
            weight: 400
        }
    ),
    new FontFace(
        "Lora", 
        `url(${italic})`,
        {
            weight: 400,
            style: "italic"
        }
    ),
    new FontFace(
        "Lora", 
        `url(${bold})`, 
        {
            weight: 700,
        }
    ),
    new FontFace(
        "Lora", 
        `url(${bolditalic})`, 
        {
            weight: 700,
            style: "italic"
        }
    )
]