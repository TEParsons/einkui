<script>
    import Button from "./Button.svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} checked Value of this button - toggles between true and false
     * @property {string|Snippet} [label] Label for this button, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this button, or a snippet to render in its place
     * @property {Snippet} [menu] Snippet defining a menu - if defined, gives this button a dropdown arrow which opens the menu
     * @property {(evt:PointerEvent, checked:boolean) => undefined} ontoggle Function to call when this button is toggled
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
        checked=$bindable(),
        label=undefined,
        icon=undefined,
        menu=undefined,
        ontoggle=(evt, checked) => undefined,
        confirmation=false,
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

    // extract Button-specific props to avoid passthrough
    let passthrough = $derived((({ 
        primary, 
        ...other 
    }) => other)(props))
</script>

<Button 
    label={label}
    icon={icon}
    menu={menu}
    onclick={(evt) => {
        if (!readonly) {
            // toggle value
            checked = !checked
        }
        // run ontoggle function
        ontoggle?.(evt, checked)
    }}
    confirmation={confirmation}
    small={small}
    tight={tight}
    large={large}
    comfy={comfy}
    ghost={ghost}
    square={square}
    primary={checked}
    stretch={stretch}
    center={center}
    bind:readonly={readonly}
    bind:disabled={disabled}
    {...passthrough}
/>

