<script>
    import ToggleButton from "./ToggleButton.svelte";
    import { onMount } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {any} selection Currently selected value, shared with sibling radio controls
     * @property {any} value Value to set selection to when this button is checked
     * @property {string|Snippet} [label] Label for this button, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this button, or a snippet to render in its place
     * @property {Snippet} [menu] Snippet defining a menu - if defined, gives this button a dropdown arrow which opens the menu
     * @property {(evt:PointerEvent, checked:boolean, value:any) => undefined} onselect Function to call when this button is toggled
     * @property {boolean} initial Start off with this button selected, if no others are
     * @property {boolean} confirmation Has to be clicked a second time to confirm
     * @property {boolean} flush No padding
     * @property {boolean} small Smaller icon
     * @property {boolean} tight Less padding
     * @property {boolean} large Larger icon
     * @property {boolean} comfy More padding
     * @property {boolean} ghost Removes border to show just text/icon/dropdown arrow
     * @property {boolean} square Remove border-radius to square the corners
     * @property {boolean} stretch Allow this button to stretch within its layout
     * @property {boolean} center Center content within this button
     * @property {boolean} readonly Fix the checkbox's value in place
     * @property {boolean} disabled Disable the button
     * @property {object<any>} props Other props are passed through to the underlying <Button>
     */

    /** @type {Props} */
    let {
        selection=$bindable(),
        value,
        label=undefined,
        icon=undefined,
        menu=undefined,
        onselect=(evt, checked, value) => undefined,
        initial=false,
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        ghost=false,
        square=false,
        stretch=false,
        center=false,
        readonly=$bindable(),
        disabled=$bindable(),
        ...props
    } = $props()

    // extract ToggleButton-specific props to avoid passthrough
    let passthrough = $derived((({ 
        confirmation,
        ...other 
    }) => other)(props))
    // if initial and nothing else is selected, select this button
    onMount(() => {
        if (selection === undefined && initial) {
            selection = value
        }
    })
</script>

<ToggleButton
    checked={selection === value}
    label={label}
    icon={icon}
    ontoggle={(evt, checked) => {
        if (!readonly) {
            // set selection
            selection = value
        }
        // run ontoggle function
        onselect(evt, checked, value)
    }}
    flush={flush}
    small={small}
    tight={tight}
    large={large}
    comfy={comfy}
    ghost={ghost}
    square={square}
    stretch={stretch}
    center={center}
    readonly
    bind:disabled={disabled}
    {...passthrough}
/>
