<script>
    import { RadioButton } from "../button";
    import { getContext, onMount } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {any} value Value to set selection to when this button is checked
     * @property {string|Snippet} [label] Label for this button, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this button, or a snippet to render in its place
     * @property {Snippet} [menu] Snippet defining a menu - if defined, gives this button a dropdown arrow which opens the menu
     * @property {(evt:PointerEvent, checked:boolean, value:any) => undefined} ontoggle Function to call when this button is toggled
     * @property {boolean} placeholder Is this the placeholder option for when no others are selected?
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
     * @property {object<any>} props Other props are passed through to the underlying <RadioButton>
     */

    /** @type {Props} */
    let {
        value,
        label=undefined,
        icon=undefined,
        onselect=(evt, value) => undefined,
        placeholder=false,
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

    let context = getContext("einkui-select");

    // register with Select object on mount
    onMount(() => {
        if (placeholder) {
            // register placeholder as such
            context.placeholder = {
                snippet: option,
                label: label,
                icon: icon
            }
        } else {
            // register regular options in options array
            context.options[value] = {
                snippet: option,
                label: label,
                icon: icon
            }
        }

        return () => {
            if (placeholder) {
                delete context.placeholder
            } else {
                delete context.options[value]
            }
        }
    })
</script>

{#snippet option()}
    <RadioButton 
        bind:selection={
            context.getSelection,
            context.setSelection
        }
        value={value}
        checked={checked}
        label={label}
        icon={icon}
        onselect={onselect}
        initial={initial}
        flush={flush}
        small={small}
        tight={tight}
        large={large}
        comfy={comfy}
        ghost={ghost}
        square={square}
        stretch={stretch}
        center={center}
        readonly={readonly}
        disabled={disabled}
        {...props}
    />
{/snippet}