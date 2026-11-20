<script>
    import { Checkbox } from "../checkbox";
    import { Label } from "../label";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {number} value Value of this slider, how many slots are filled
     * @property {number} total Total number of slots in this slider
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
        onchange=(evt, value) => {},
        inverse=false,
        round=false,
        small=false,
        large=false,
        vertical=false,
        flip=false,
        readonly=$bindable(),
        disabled=$bindable(),
        ...props
    } = $props()
    
    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
    // work out indices of each item
    let indices = $derived(
        flip
        ? Array.from({ length: total }, (_, i) => i + 1).toReversed()
        : Array.from({ length: total }, (_, i) => i + 1)
    )
    // clip value to within range
    $effect(() => {
        if (value > total) value = total
        if (value < 0) value = 0
    })
</script>
<div class=container>
    {#if label}
        <Label 
            value={label}
            for={id}
        />
    {/if}
    <div 
        id={id}
        class=slider
        class:vertical
        {...props}
    >
        {#each indices as i}
            <Checkbox 
                checked={ i <= (inverse ? total - value : value)}
                ontoggle={
                    (evt, checked) => {
                        if (!readonly) {
                            // add to or subtract from total based on position
                            value += (inverse ? total - value : value) < i ? (inverse ? -1 : 1) : (inverse ? 1 : -1)
                        }
                        // call onchange function
                        onchange(evt, value)
                    }
                }
                small={small}
                large={large}
                round={round}
                readonly
                disabled={disabled}
            />
        {/each}
    </div>
</div>
<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: .5em;
        align-items: start;
    }
    .slider {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: .3em;
    }

    /* Orientation */
    .slider.vertical {
        flex-direction: column;
    }
</style>