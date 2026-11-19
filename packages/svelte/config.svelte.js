import { onMount } from "svelte";

// default configuration object
const defaults = {
    fonts: {
        main: "Lora",
        mono: "Fira Mono",
        symbol: ["Noto Emoji", "Noto Sans Symbols", "Noto Sans Symbols 2"],
    },
    colors: {
        base: "#ffffff",
        mantle: "#aaaaaa",
        crust: "#555555",
        overlay: "#000000",
        textOn: {
            base: "var(--einkui-color-overlay)",
            mantle: "var(--einkui-color-overlay)",
            crust: "var(--einkui-color-base)",
            overlay: "var(--einkui-color-base)"
        },
        darkMode: {
            base: "#000000",
            mantle: "#555555",
            crust: "#aaaaaa",
            overlay: "#ffffff",
            textOn: {
                base: "var(--einkui-color-overlay)",
                mantle: "var(--einkui-color-overlay)",
                crust: "var(--einkui-color-base)",
                overlay: "var(--einkui-color-base)"
            }
        }
    },
    translate: text => text
}

// user-specified translation object
var _translate = $state.raw(defaults.translate)
export const translate = text => _translate(text)

/**
 * Setup colors from spec
 * 
 * @param {object} spec Color spec from config
 */
function setupColors(spec) {
    // split text colors from other colors
    let { textOn, ...core } = spec
    // setup core colors
    for (let [key, val] of Object.entries(core)) {
        // set CSS variable
        document.documentElement.style.setProperty(
            `--einkui-color-${key}`, val
        )
    }
    // setup text colors
    for (let [key, val] of Object.entries(textOn)) {
        // set CSS variable
        document.documentElement.style.setProperty(
            `--einkui-color-text-on-${key}`, val
        )
    }
}


/**
 * Setup einkui; load fonts, setup CSS variables, etc.
 * 
 * @param {object} config Configuration for einkui
 */
export function init(config={}) {
    onMount(() => {
        // apply defaults
        config = { 
            ...defaults,
            fonts: {...defaults.fonts, ...config.fonts},
            colors: {
                ...defaults.colors, ...config.colors,
                textOn: {...defaults.colors.textOn, ...config.colors?.textOn},
                darkMode: {
                    ...defaults.colors.darkMode, ...config.colors?.darkMode,
                    textOn: {...defaults.colors.darkMode.textOn, ...config.colors?.darkMode?.textOn}
                }
            }
        }

        // setup fonts
        for (let [key, val] of Object.entries(config.fonts)) {
            // handle strings
            if (typeof val === "string") {
                if (val.includes(",")) {
                    // split by , if there are any
                    val = val.split(",").map(String.trim)
                } else {
                    // otherwise put in an array
                    val = [val]
                }
            }
            // load font(s) if packaged
            for (let font of val) {
                import("./fonts").then(
                    resp => {
                        // get packaged fonts
                        let fonts = resp.default
                        // do nothing if not a packaged font
                        if (!(font in fonts)) return
                        // load each face
                        for (let face of fonts[font]) {
                            // add to document
                            document.fonts.add(face)
                        }
                    }
                )
            }
            // set CSS variable
            document.documentElement.style.setProperty(
                `--einkui-font-${key}`, val.map(subval => `"${subval}"`)
            )
        }

        // split colors into light and dark mode
        let { darkMode, ...lightMode } = config.colors
        // create watcher for system color scheme
        let scheme = window.matchMedia('(prefers-color-scheme: dark)')
        // setup colors for current system scheme
        setupColors(scheme.matches ? darkMode : lightMode)
        // re-configure colors when scheme changes
        scheme.addEventListener("change", value => setupColors(value ? darkMode : lightMode))

        // set translation object
        _translate = config.translate
    })
}