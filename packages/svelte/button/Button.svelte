<script>
    import { Icon } from "../icon";
    import { Label } from "../label";
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
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
     * @property {object<any>} props Other props are passed through to the underlying <button>
     */

    /** @type {Props} */
    let {
        label:_label=undefined,
        icon=undefined,
        menu=undefined,
        onclick=(evt) => {},
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
    // label is overridden when confirming
    let label = $derived(confirming ? translate("Confirm?") : _label)
    // name to use when referring to this button, falling back to aria-label if there is no text label
    let name = $derived(typeof label === "string" ? label : props["aria-label"]);
    // keep track of confirmation state
    let confirming = $state.raw(false);
    // keep track of menu shown
    let menuShown = $state.raw(false);
</script>


<div 
    class=button-container
    class:stretch
>
    <button
        id={id}
        onclick={evt => {
            if (confirmation && !confirming) {
                confirming = true
            } else {
                confirming = false

                return onclick?.(evt)
            }
        }}
        class:flush
        class:small
        class:tight
        class:large
        class:comfy
        class:ghost
        class:square
        class:primary
        class:stretch
        class:center
        class:has-dropdown={menu !== undefined}
        aria-label={props["aria-label"] ?? name}
        disabled={disabled}
        {...props}
    >
        {#if icon}
            {#if typeof icon === "function"}
                {@render icon(id)}
            {:else}
                <Icon
                    src={icon}
                    size={
                        small ? "1em" : large ? "1.5em" : "1.2em"
                    }
                />
            {/if}
        {/if}

        {#if label}
            {#if typeof label === "function"}
                {@render label(id)}
            {:else}
                <Label
                    value={label}
                    for={id}
                />
            {/if}
        {/if}
    </button>
    {#if menu}
        <button
            onclick={evt => menuShown = !menuShown}
            class=dropdown
            class:small
            class:flush
            class:tight
            class:large
            class:comfy
            class:ghost
            class:square
            class:primary
            aria-label={props["aria-label"] ?? name + translate(" dropdown")}
            disabled={disabled}
        >
            <Icon
                src=▼
                size=.5em
            />
            {#if menuShown}
                {@render menu()}
            {/if}
        </button>
    {/if}
</div>

<style>
    /* Core button styling */
    .button-container {
        display: flex;
        flex-direction: row;
    }
    button {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
        font-family: var(--einkui-font-main);
    }
    button:disabled {
        color: var(--einkui-color-crust);
        border-color: var(--einkui-color-mantle);
        background-color: var(--einkui-color-mantle);
    }

    /* Dropdown menu */
    button.has-dropdown {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    button.dropdown {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
    }

    /* Padding */
    button {
        padding: .5em .7em;
    }
    button.flush {
        padding: 0;
    }
    button.tight {
        padding: .3em .4em;
    }
    button.comfy {
        padding: .8em 1.1em;
    }

    /* Styling */
    button {
        background-color: var(--einkui-color-base);
        color: var(--einkui-color-text-on-base);
        border: 1px solid var(--einkui-color-overlay);
        border-radius: .5rem;
    }
    button.ghost {
        background-color: transparent;
        border-color: transparent;
    }
    button.ghost:disabled {
        background-color: var(--einkui-color-mantle);
    }
    button.square {
        border-radius: 0;
    }
    button.primary {
        background-color: var(--einkui-color-overlay);
        color: var(--einkui-color-text-on-overlay);
    }
    button.primary:disabled {
        background-color: var(--einkui-color-crust);
        border-color: var(--einkui-color-crust);
        color: var(--einkui-color-mantle);
    }
    button.primary.dropdown {
        border-left-color: var(--einkui-color-text-on-overlay);
    }

    /* Layout */
    button.stretch {
        text-align: left;
        width: auto;
        flex: 1;
    }
    .button-container.stretch { 
        flex: 1; 
    }
    button.center {
        justify-content: center;
    }
</style>
