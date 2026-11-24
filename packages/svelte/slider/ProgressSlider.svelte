<script>
    import InputContainer from "../input/InputContainer.svelte"
    import { Checkbox } from "../checkbox";
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {number} value Value of this slider, how much of it is filled
     * @property {number} total Max value of this slider
     * @property {string|Snippet} [label] Label for this slider, or a snippet to render in its place
     * @property {(evt:PointerEvent, value:number) => undefined} onchange Function to call when this slider changes value
     * @property {boolean} inverse Treat value as how many slots are empty, rather than filled
     * @property {boolean} round Circular checkboxes
     * @property {boolean} small Smaller checkboxes
     * @property {boolean} large Larger checkboxes
     * @property {boolean} vertical Orient checkboxes vertically rather than horizontally
     * @property {boolean} flip Fill slider from right-to-left (if horizontal) or bottom-to-top (if vertical)
     * @property {boolean} readonly Fix the slider's value in place
     * @property {boolean} disabled Disable the slider
     * @property {object<any>} props Other props are passed through to the <div> containing the checkboxes
     */

    /** @type {Props} */
    let {
        value=$bindable(),
        total,
        label=undefined,
        ctrls=undefined,
        onchange=(evt, value) => {},
        inverse=false,
        small=false,
        large=false,
        vertical=false,
        flip=false,
        readonly=$bindable(),
        disabled=$bindable(),
        ...props
    } = $props()
    
    // work out name in case label isn't text
    let name = $derived(typeof label === "string" ? label : (props["aria-label"] || props.id))
    // clip value to within range
    $effect(() => {
        if (value < 0) value = 0
        if (value > total) value = total
    })
</script>

<InputContainer
    label={label}
>
    {#snippet ctrl(id, received)}
        <div 
            id={id}
            class=slider
            class:small
            class:large
            class:vertical
            class:flip
            class:disabled
            {...props}
        >
            {#if (inverse ? total - value : value) > 0}
                <button
                    aria-label={translate("Reduce ") + name}
                    onclick={evt => {
                        if (!readonly) {
                            // add to or subtract from value based on inverse
                            value += (inverse ? 1 : -1)
                        }
                        // call onchange function
                        onchange?.(evt, value)
                    }}
                    style:background-color={disabled ? "var(--einkui-color-crust)" : "var(--einkui-color-overlay)"}
                    style:flex-basis="{100 * (inverse ? total - value : value) / total}%"
                    disabled={disabled}
                ></button>
            {/if}
            {#if (inverse ? total - value : value) < total}
                <button
                    aria-label={translate("Increase ") + name}
                    onclick={evt => {
                        if (!readonly) {
                            // add to or subtract from value based on inverse
                            value += (inverse ? -1 : 1)
                        }
                        // call onchange function
                        onchange?.(evt, value)
                    }}
                    style:background-color="var(--einkui-color-base)"
                    style:flex-grow=1
                    disabled={disabled}
                ></button>
            {/if}
        </div>
    {/snippet}

    {@render ctrls?.()}
</InputContainer>

<style>
    .slider {
        position: relative;
        display: flex;
        border: 1px solid var(--einkui-color-overlay);
    }
    .slider.disabled {
        border-color: var(--einkui-color-crust);
    }
    .slider button {
        border: none;
        outline: none;
    }

    /* Size */
    .slider {
        height: 1em;
    }
    .slider.vertical {
        width: 1em;
    }
    .slider.small {
        height: .5em;
    }
    .slider.small.vertical {
        width: .5rem
    }
    .slider.large {
        height: 2em;
    }
    .slider.vertical.large {
        width: 2em;
    }

    /* Orientation */
    .slider:not(.vertical) {
        flex-direction: row;
        width: 100%;
        min-width: 2em;
    }
    .slider:not(.vertical).flip {
        flex-direction: row-reverse;
    }
    .slider.vertical {
        flex-direction: column;
        height: 100%;
        min-height: 2em;
    }
    .slider.flip.vertical {
        flex-direction: column-reverse
    }
</style>