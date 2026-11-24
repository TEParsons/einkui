<script>
    import { Label } from "../label";
    import { Icon } from "../icon";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {string|Snippet} [label] Label for this input, or a snippet to render in its place
     * @property {string|Snippet} [icon] Icon for this input, or a snippet to render in its place
     * @property {Snippet} ctrl The actual input control itself, will receive an id and props object
     * @property {boolean} line Draw a line under the control to mark it as an input
     * @property {Snippet} children Child elements are rendered to the right of the label
     * @property {object<any>} props Other props are passed through to the ctrl snippet
     */

    /** @type {Props} */
    let {
        label=undefined,
        icon=undefined,
        ctrl=undefined,
        line=false,
        children=undefined,
        ...props
    } = $props()
    
    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
</script>


<div class=container>
    {#if label || icon}
        <div class=label-container>
            <div class=label-left>
                {#if icon}
                    <Icon
                        src={icon}
                        size=1em
                    />
                {/if}
                {#if label}
                    <Label 
                        value={label}
                        for={id}
                    />
                {/if}
            </div>
            {@render children?.()}
        </div>
    {/if}
    <div 
        class=ctrl-container
        class:line
    >
        {@render ctrl?.(id, props)}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: .5em;
        align-items: stretch;
    }
    .label-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .25em;
    }
    .label-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
    }
    .ctrl-container.line {
        border-bottom: 1px solid var(--einkui-color-overlay);
    }
</style>