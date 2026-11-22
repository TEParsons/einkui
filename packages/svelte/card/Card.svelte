<script>
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} flush No padding
     * @property {boolean} tight Less padding
     * @property {boolean} comfy More padding
     * @property {boolean} primary Emphasize this card by flipping its colors
     * @property {boolean} ghost Removes border to show just content
     * @property {boolean} square Remove border-radius to square the corners
     * @property {boolean} center Center content in this card
     * @property {boolean} stretch Allow this card to stretch within its layout
     * @property {Snippet} [header] Elements rendered at the top of the card, separated by a line
     * @property {Snippet} [footer] Elements rendered at the bottom of the card, separated by a line
     * @property {Snippet} [children] Child elements are rendered inside the card
     * @property {object<any>} props Other props are passed through to the underlying <div>
     */

    /** @type {Props} */
    let {
        flush=false,
        tight=false,
        comfy=false,
        primary=false,
        ghost=false,
        square=false,
        center=false,
        stretch=false,
        header=undefined,
        footer=undefined,
        children=undefined,
        ...props
    } = $props()

    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
</script>


<div
    id={id}
    class=card
    class:flush
    class:tight
    class:comfy
    class:primary
    class:ghost
    class:center
    class:stretch
    {...props}
>
    {#if header}
        <div class=card-header>
            {@render header()}
        </div>
    {/if}
    {@render children?.()}
    {#if footer}
        <div class=card-footer>
            {@render footer()}
        </div>
    {/if}
</div>

<style>
    /* Core button styling */
    .card {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--einkui-color-mantle);
        border-radius: .5rem;
    }
    .card .card-header,
    .card .card-footer {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        align-items: inherit;
    }

    /* Padding */
    .card {
        padding: .5em .7em;
        --einkui-card-marginals-padding: .25em;
    } 
    .card .card-header {
        padding-bottom: var(--einkui-card-marginals-padding);
        margin-bottom: var(--einkui-card-marginals-padding);
    }
    .card .card-footer {
        padding-top: var(--einkui-card-marginals-padding);
        margin-top: var(--einkui-card-marginals-padding);
    }
    .card.flush {
        padding: 0;
        --einkui-card-marginals-padding: 0;
    }
    .card.tight {
        padding: .3em .4em;
        --einkui-card-marginals-padding: .15em;
    }
    .card.comfy {
        padding: .8em 1.1em;
        --einkui-card-marginals-padding: .4em;
    }

    /* Styling */
    .card {
        background-color: var(--einkui-color-base);
        color: var(--einkui-color-text-on-base);
        border: 1px solid var(--einkui-color-mantle);
        border-radius: .5rem;
    }
    .card .card-header {
        border-bottom: 1px solid var(--einkui-color-mantle);
    }
    .card .card-footer {
        border-top: 1px solid var(--einkui-color-mantle);
    }
    .card.ghost {
        background-color: transparent;
        border-color: transparent;
    }
    .card.primary {
        background-color: var(--einkui-color-overlay);
        color: var(--einkui-color-text-on-overlay);
    }

    /* Layout */
    .card.center {
        align-items: center;
    }
    .card.stretch {
        width: auto;
        flex: 1;
    }
</style>
