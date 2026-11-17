import regular from "./FiraMono-Regular.ttf?url"
import bold from "./FiraMono-Bold.ttf?url"


export default [
    new FontFace(
        "Fira Mono", 
        `url(${regular})`, 
        {
            weight: 400
        }
    ),
    new FontFace(
        "Fira Mono", 
        `url(${bold})`, 
        {
            weight: 700,
        }
    )
]