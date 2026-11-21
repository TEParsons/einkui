<script>
    import { Label } from "../label";
    import { setContext } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} [label] Label to put at the top of this array
     * @property {boolean} flush No padding
     * @property {boolean} tight Less padding
     * @property {boolean} comfy More padding
     * @property {boolean} center Center content within this array, perpendicular to direction
     * @property {boolean} horizontal Arrange items in this array horizontally rather than vertically
     * @property {boolean} edgeless Remove borders at the edges of the array
     * @property {boolean} ghost Remove border to show just content
     * @property {Snippet} [children] Child ArrayItem elements are rendered in order, other children are rendered in a single misc item at the bottom
     * @property {object<any>} props Other props are passed through to the underlying <div>
     */

    /** @type {Props} */
    let {
        label=undefined,
        flush=false,
        tight=false,
        comfy=false,
        horizontal=false,
        edgeless=false,
        ghost=false,
        children,
        ...props
    } = $props()

    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
    // setup context for child items to write to
    let array = $state({})
    setContext("einkui-array", array)
</script>
<div class=container>
    {#if label}
        <Label 
            value={label}
            for={id}
        />
    {/if}
    <div 
        id={id}
        class=array
        class:flush
        class:tight
        class:comfy
        class:horizontal
        class:edgeless
        class:ghost
        {...props}
    >
        {#each Object.values(array) as [item, itemProps]}
            <div 
                class=array-item
                class:flush={itemProps.flush}
                class:tight={itemProps.tight}
                class:comfy={itemProps.comfy}
                {...itemProps}
            >
                {@render item()}
            </div>
        {/each}
        <div 
            class=misc-item
            class:ghost={true}
        >
            {@render children?.()}
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .5rem;
    }
    .array {
        display: flex;
        flex-direction: column;
        align-items: stretch;

    }
    .array-item {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    /* Edges */
    .array:not(.edgeless):not(.ghost):not(.horizontal) {
        border-top: 1px solid var(--einkui-color-mantle);
    }
    .array:not(.edgeless):not(.ghost).horizontal {
        border-left: 1px solid var(--einkui-color-mantle);
    }
    .array:not(.edgeless):not(.ghost):not(.horizontal) .array-item:nth-last-child(1 of .array-item) {
        border-bottom: 1px solid var(--einkui-color-mantle);
    }
    .array:not(.ghost):not(.edgeless).horizontal .array-item:nth-last-child(1 of .array-item) {
        border-right: 1px solid var(--einkui-color-mantle);
    }
    .array:not(.ghost):not(.horizontal) .array-item:not(:nth-last-child(1 of .array-item)) {
        border-bottom: 1px solid var(--einkui-color-mantle);
    }
    .array:not(.ghost).horizontal .array-item:not(:nth-last-child(1 of .array-item)) {
        border-left: 1px solid var(--einkui-color-mantle);
    }

    /* Direction */
    .array.horizontal {
        flex-direction: row;
    }
    .array-item.horizontal {
        padding: 1em .5em;
    }
    .array.horizontal.tight .array-item,
    .array-item.horizontal.tight {
        padding: 1em .25em;
    }
    .array.horizontal.comfy .array-item,
    .array-item.horizontal.comfy {
        padding: .7em 1em;
    }

    /* Spacing */
    .array-item,
    .misc-item {
        padding: .5em .7em;
    }
    
    .array.flush .array-item,
    .array.flush .misc-item,
    .array-item.flush,
    .misc-item.flush {
        padding: 0;
    }
    .array.tight .array-item,
    .array.tight .misc-item,
    .array-item.tight,
    .misc-item.tight {
        padding: .25em .7em;
    }
    .array.comfy .array-item,
    .array.comfy .misc-item,
    .array-item.comfy,
    .misc-item.comfy {
        padding: 1em .7em;
    }
</style>