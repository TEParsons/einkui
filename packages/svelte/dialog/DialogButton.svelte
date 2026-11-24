<script>
    import { getContext, onMount } from "svelte";
    import { Button } from "../button";
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {"OK"|"APPLY"|"CANCEL"|"YES"|"NO"|"HELP"} [action] Dialog action which this button fulfills
     * @property {string|Snippet} [label] Label for this button, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this button, or a snippet to render in its place
     * @property {Snippet} [menu] Snippet defining a menu - if defined, gives this button a dropdown arrow which opens the menu
     * @property {(evt:PointerEvent) => undefined} onclick Function to call when this button is pressed
     * @property {boolean} confirmation Has to be clicked a second time to confirm
     * @property {boolean} flush No padding
     * @property {boolean} small Smaller icon
     * @property {boolean} tight Less padding
     * @property {boolean} large Larger icon
     * @property {boolean} comfy More padding
     * @property {boolean} ghost Removes border to show just text/icon/dropdown arrow
     * @property {boolean} square Remove border-radius to square the corners
     * @property {boolean} primary Style this as a "primary" button
     * @property {boolean} stretch Allow this button to stretch within its layout
     * @property {boolean} center Center content within this button
     * @property {boolean} disabled Disable the button
     * @property {object<any>} props Other props are passed through to the underlying <Button>
     */

    /** @type {Props} */
    let {
        action=undefined,
        label=undefined,
        icon=undefined,
        menu=undefined,
        onclick:_onclick=(evt) => {},
        confirmation=false,
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        ghost=false,
        square=false,
        primary=false,
        stretch=false,
        center=false,
        disabled=$bindable(),
        ...props
    } = $props()

    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
    // register this button with its dialog
    let dialog = getContext("einkui-dialog")
    onMount(() => {
        dialog.buttons[action || id] = {
            snippet: button,
            onclick: _onclick,
            disabled: disabled
        }

        return () => delete dialog.buttons[action]
    })
    // augment onclick according to action
    let onclick = evt => {
        // handle when HELP button supplies onclick as a string
        if (action === "HELP" && typeof _onclick === "string") {
            window.open(_onclick, '_blank');
            return
        }
        // call supplied onclick function
        try {
            _onclick?.(evt);
        } finally {
            // close dialog if action calls for it (even if onclick errored)
            if (["OK", "CANCEL", "YES", "NO"].includes(action)) {
                dialog.onclose(action);
                dialog.setShown(false);
            }
        }
    }
    // establish defaults according to action
    let defaultLabels = {
        OK: translate("OK"),
        APPLY: translate("Apply"),
        CANCEL: translate("Cancel"),
        YES: translate("Yes"),
        NO: translate("No"),
        HELP: translate("Help")
    }
</script>

{#snippet button()}
    <Button 
        label={label || defaultLabels[action]}
        icon={icon}
        menu={menu}
        onclick={onclick}
        confirmation={confirmation}
        flush={flush}
        small={small}
        tight={tight}
        large={large}
        comfy={comfy}
        ghost={ghost}
        square={square}
        primary={primary || action === "OK"}
        stretch={stretch}
        center={center}
        bind:disabled={disabled}
        {...props}
    />
{/snippet}
