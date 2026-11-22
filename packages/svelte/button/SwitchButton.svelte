<script>
    import Button from "./Button.svelte";
    import { Label } from "../label";
    import { Card } from "../card";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} checked Value of this button - toggles between true and false
     * @property {array<string|Snippet, string|Snippet>} labels Labels for this button, or snippets to render in their place
     * @property {Snippet} [menu] Snippet defining a menu - if defined, gives this button a dropdown arrow which opens the menu
     * @property {(evt:PointerEvent, checked:boolean) => undefined} ontoggle Function to call when this button is toggled
     * @property {boolean} small Smaller icon
     * @property {boolean} flush No padding
     * @property {boolean} tight Less padding
     * @property {boolean} large Larger icon
     * @property {boolean} comfy More padding
     * @property {boolean} ghost Removes border to show just text/icon/dropdown arrow
     * @property {boolean} vertical Arrange options vertically rather than horizontally
     * @property {boolean} flip Flip such that the first item is right/bottom rather than left/top
     * @property {boolean} stretch Allow this button to stretch within its layout
     * @property {boolean} readonly Fix the checkbox's value in place
     * @property {boolean} disabled Disable the button
     * @property {object<any>} props Other props are passed through to the underlying <Button>
     */

    /** @type {Props} */
    let {
        checked=$bindable(),
        labels=undefined,
        menu=undefined,
        ontoggle=(evt, checked) => undefined,
        confirmation=false,
        flush=false,
        tight=false,
        comfy=false,
        ghost=false,
        vertical=false,
        flip=false,
        stretch=false,
        readonly=$bindable(),
        disabled=$bindable(),
        ...props
    } = $props()

    // extract Button-specific props to avoid passthrough
    let passthrough = $derived((({ 
        label,
        primary, 
        icon, 
        confirmation,
        small,
        large,
        ...other 
    }) => other)(props))
</script>

<Button 
    menu={menu}
    onclick={(evt) => {
        if (!readonly) {
            // toggle value
            checked = !checked
        }
        // run ontoggle function
        ontoggle?.(evt, checked)
    }}
    ghost={ghost}
    stretch={stretch}
    flush
    bind:readonly={readonly}
    bind:disabled={disabled}
    {...passthrough}
>
    {#snippet label(id)}
        <div 
            class=label-container
            class:vertical
            class:flip
        >
            <Card
                primary={checked}
                flush={flush}
                tight={tight}
                comfy={comfy}
                stretch={stretch}
                ghost
                center
            >
                {#if typeof labels[0] === "function"}
                    {@render labels[0](id)}
                {:else}
                    <Label 
                        value={labels[0]}
                    />
                {/if}
            </Card>
            <Card
                primary={!checked}
                flush={flush}
                tight={tight}
                comfy={comfy}
                stretch={stretch}
                ghost
                center
            >
                {#if typeof labels[1] === "function"}
                    {@render labels[1](id)}
                {:else}
                    <Label 
                        value={labels[1]}
                    />
                {/if}
            </Card>
        </div>
    {/snippet}
</Button>

<style>
    .label-container {
        display: flex;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        margin: -1px;
    }

    /* Orientation */
    .label-container:not(.vertical) {
        flex-direction: row;
    }
    .label-container:not(.vertical).flip {
        flex-direction: row-reverse;
    }
    .label-container.vertical {
        flex-direction: column;
    }
    .label-container.flip.vertical {
        flex-direction: column-reverse
    }
</style>
