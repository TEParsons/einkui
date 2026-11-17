import regular from "./NotoSansSymbols-Regular.ttf?url";
import bold from "./NotoSansSymbols-Bold.ttf?url";


export default [
    new FontFace(
        "Noto Sans Symbols", 
        `url(${regular})`, 
        {
            weight: 400
        }
    ),
    new FontFace(
        "Noto Sans Symbols", 
        `url(${bold})`, 
        {
            weight: 700,
        }
    )
]