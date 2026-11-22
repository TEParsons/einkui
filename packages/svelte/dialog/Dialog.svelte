<script>
    import { Card } from "../card";
    import { untrack, setContext } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} shown Whether this dialog is shown, bindable
     * @property {() => undefined} onopen Function to call when dialog opens
     * @property {boolean} flush No padding
     * @property {boolean} tight Less padding
     * @property {boolean} comfy More padding
     * @property {Snippet} [buttons] Snippet describing this dialog's buttons
     * @property {Snippet} children Child elements are rendered as the dialog's contennts
     * @property {object<any>} props Other props are passed through to the underlying <dialog>
     */

    /** @type {Props} */
    let {
        shown=$bindable(),
        onopen=() => {},
        flush=false,
        tight=false,
        comfy=false,
        buttons:buttonsSnippet=undefined,
        children,
        ...props
    } = $props();

    // keep track of dialog context for child elements
    let context = $state({
        handle: undefined,
        setShown: value => shown = value,
        buttons: {}
    })
    setContext("einkui-dialog", context)
    // extract unpositioned buttons
    let unpositionedButtons = $derived((({ 
        OK,
        CANCEL,
        APPLY,
        YES,
        NO,
        HELP,
        ...other 
    }) => other)(props))
    // show/hide according to bindable
    $effect(() => {
        if (shown) {
            untrack(() => onopen())
            context.handle.showModal()
        } else {
            context.handle.close()
        }
    })
</script>

<dialog
    bind:this={context.handle}
    class:flush
    class:tight
    class:comfy
    {...props}
>
    <div
        class=dialog-content
    >
        {@render children?.()}
    </div>
    <div class=dialog-buttons>
        {@render context.buttons.HELP?.snippet()}
        <div class=gap></div>
        {@render context.buttons.CANCEL?.snippet()}
        {@render buttonsSnippet()}
        {@render context.buttons.YES?.snippet()}
        {@render context.buttons.NO?.snippet()}
        {@render context.buttons.APPLY?.snippet()}
        {@render context.buttons.OK?.snippet()}
    </div>
</dialog>

<style>
    dialog {
        padding: 0;
        background-color: var(--einkui-color-base);
        height: min-content;
        max-height: 90vh;
        width: 80vw;
    }
    .dialog-content {
        overflow-y: auto;
    }
    .dialog-buttons {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        border-top: 1px solid var(--einkui-color-mantle);
        padding-top: var(--einkui-card-marginals-padding);
        margin-top: var(--einkui-card-marginals-padding);
    }
    .gap {
        flex-grow: 1
    }

    /* Spacing */
    .flush {
        padding: 0;
        --einkui-card-marginals-padding: 0;
    }
    .tight {
        padding: .3em .4em;
        --einkui-card-marginals-padding: .3em;
    }
    .comfy {
        padding: .8em 1.1em;
        --einkui-card-marginals-padding: .8em;
    }
</style>
