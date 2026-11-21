<script>
    import { Label } from "../label";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {string|Snippet} [label] Label for this slider, or a snippet to render in its place
     * @property {true|Snippet} [ctrls] Optional numeric controls above the slider
     * @property {Snippet} slider The actual slider control itself
     * @property {object<any>} props Other props are passed through to the slider snippet
     */

    /** @type {Props} */
    let {
        label=undefined,
        ctrls=undefined,
        slider=undefined,
        ...props
    } = $props()
    
    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
</script>


<div class=container>
    {#if label || ctrls}
        <div class=label-container>
            {#if label}
                <Label 
                    value={label}
                    for={id}
                />
            {:else}
                <div></div>
            {/if}
            {#if ctrls}
                {@render ctrls()}
            {/if}
        </div>
    {/if}
        {@render slider(id, props)}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: .5em;
        align-items: stretch;
    }
    .label-container {
        display: grid;
        grid-template-columns: 1fr max-content;
        align-items: end;
    }
</style>