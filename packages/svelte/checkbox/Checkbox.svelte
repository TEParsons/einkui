<script>
    import { Label } from "../label";
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {0|0.5|1|2} checked Value of this checkbox - normally toggles between 0 and 1, but other props enable other values
     * @property {string|Snippet} [label] Label for this checkbox, or a snippet to render in its place
     * @property {(evt:PointerEvent, checked:0|0.5|1|2) => undefined} ontoggle Function to call when this checkbox changes value
     * @property {boolean} inverse Allow this checkbox to be inverse checked (checked = -1)
     * @property {boolean} half Allow this checkbox to be half checked (checked = 0.5)
     * @property {boolean} double Allow this checkbox to be double checked (checked = 2)
     * @property {boolean} round Circular checkbox
     * @property {boolean} small Smaller checkbox
     * @property {boolean} large Larger checkbox
     * @property {boolean} readonly Fix the checkbox's value in place
     * @property {boolean} disabled Disable the checkbox
     * @property {object<any>} props Other props are passed through to the underlying <button>
     */

    /** @type {Props} */
    let {
        checked=$bindable(),
        label=undefined,
        ontoggle=(evt, value) => {},
        inverse=false,
        half=false,
        double=false,
        round=false,
        small=false,
        large=false,
        readonly=$bindable(),
        disabled=$bindable(),
        ...props
    } = $props()

    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
    // figure out allowed states
    let states = $derived([
        ...inverse ? [-1] : [],
        0,
        ...half ? [0.5] : [],
        1,
        ...double ? [2] : []
    ])
</script>

<div class=container>
    <button 
        id={id}
        aria-label={checked ? translate("Checkbox: Checked") : translate("Checkbox: Unchecked")}
        onclick={evt => {
            if (!readonly) {
                // get index of current state
                let i = states.indexOf(checked === true ? 1 : (checked || 0))
                // progress through states
                checked = states[i+1] === undefined ? states[0] : states[i+1]
            }
            // run ontoggle function
            ontoggle(evt, checked)
        }}
        class:inverse-checked={checked===-1}
        class:half-checked={checked === 0.5}
        class:checked={checked === 1 || checked === true}
        class:double-checked={checked === 2}
        class:round
        class:small
        class:large
        disabled={disabled}
    ></button>
    {#if label}
        <Label 
            value={label}
            for={id}
        />
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        align-items: center;
    }
    button {
        position: relative;
        line-height: 1em;
        border: .25em solid var(--einkui-color-overlay);
        border-radius: .5em;
    }
    

    /* Click state */
    button {
        background-color: var(--einkui-color-base);
    }
    button:disabled {
        border-color: var(--einkui-color-crust);
    }
    button.inverse-checked {
        border-style: dashed;
        border-width: .2em;
    }
    button.half-checked::before {
        content: "";
        position: absolute;
        inset: 0 50% 0 0;
        border-radius: .5em 0 0 .5em;
        background-color: var(--einkui-color-overlay);
    }
    button.checked,
    button.double-checked {
        background-color: var(--einkui-color-overlay);
    }
    button.double-checked::before {
        content: "";
        position: absolute;
        inset: 25%;
        border-radius: .5em;
        background-color: var(--einkui-color-base);
    }
    button.half-checked:disabled::before,
    button.checked:disabled,
    button.double-checked:disabled {
        background-color: var(--einkui-color-crust);
    }

    /* Shape */
    button {
        border-radius: .5em;
    }
    button.round {
        border-radius: 50%;
    }
    button.half-checked::before {
        border-radius: 50% 0 0 50%;
    }

    /* Size */
    button {
        width: 1.5em;
        height: 1.5em;
    }
    button.small {
        width: 1.2em;
        height: 1.2em;
    }
    button.large {
        width: 2em;
        height: 2em;
    }
</style>