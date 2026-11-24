<script>
    import { Stepper } from "../stepper";
    import { DetailsButton } from "../details";
    import { DialogButton } from "../dialog";
    import InputContainer from "../input/InputContainer.svelte";
    import { setContext } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {number} value Value of the stepper
     * @property {number} [min] Minimum value of the stepper, if any
     * @property {number} [max] Maximum value of the stepper, if any
     * @property {number} step Amount to increase/decrease by, default is 1
     * @property {string|Snippet} label Label for this control, or snippet to render in its place
     * @property {string|Snippet} title Title for the dialog (will use label if not given)
     * @property {(evt:PointerEvent) => undefined} onchange Function to call when value changes
     * @property {(evt:undefined) => undefined} onopen Function to call when the dialog opens
     * @property {(evt:"OK"|"CANCEL"|"YES"|"NO") => undefined} onclose Function to call when the dialog closes
     * @property {boolean} flush No padding
     * @property {boolean} small Smaller icon
     * @property {boolean} tight Less padding
     * @property {boolean} large Larger icon
     * @property {boolean} comfy More padding
     * @property {boolean} ghost Removes border to show just text/icon/dropdown arrow
     * @property {boolean} square Remove border-radius to square the corners
     * @property {boolean} stretch Allow this control to stretch within its layout
     * @property {boolean} disabled Disable the button
     * @property {object<any>} props Other props are passed through to the underlying <div>
     */

    /** @type {Props} */
    let {
        value=$bindable(),
        min=undefined,
        max=undefined,
        step=1,
        label:_label=undefined,
        title=undefined,
        onchange=(evt, value) => {},
        onopen=(evt) => {},
        onclose=(evt) => {},
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        ghost=false,
        square=false,
        stretch=false,
        vertical=false,
        disabled=$bindable(),
        children,
        ...props
    } = $props()

    // keep track of initial value on open
    let initial = $state.raw();
    // operate on a temporary state which is applied on OK
    let temp = $state.raw();
</script>

<InputContainer
    label={_label}
    line
>
    {#snippet ctrl(id, parentProps)}
        <DetailsButton
            label={String(value)}
            title={title || _label}
            onopen={evt => {
                // update initial and temp
                temp = $state.snapshot(value)
                initial = $state.snapshot(value)
                // run onopen function
                onopen?.(evt)
            }}
            onclose={onclose}
            flush={flush}
            tight={tight}
            comfy={comfy}
            stretch
            center
            square
            ghost
            bind:disabled={disabled}
        >
            <div class=controls>
                <Stepper 
                    bind:value={temp}
                    bind:initial={initial}
                    min={min}
                    max={max}
                    step={step}
                    label={_label}
                    onchange={onchange}
                    flush={flush}
                    small={small}
                    tight={tight}
                    large={large}
                    comfy={comfy}
                    ghost={ghost}
                    square={square}
                    stretch={stretch}
                    vertical={vertical}
                    bind:disabled={disabled}
                />

                {@render children?.()}
            </div>

            {#snippet buttons()}
                <DialogButton
                    action=OK
                    onclick={evt => value = $state.snapshot(temp)}
                />
                <DialogButton action=CANCEL />
            {/snippet}
        </DetailsButton>
    {/snippet}
</InputContainer>

<style>
    .controls {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
</style>