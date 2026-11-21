<script>
    import { marked } from "marked";
    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {string|Snippet} value Value of the label, or a snippet to render inside it
     * @property {string} [for] ID of the control this is a label for
     * @property {object<any>} props Other props are passed through to the underlying <label>
     */

    /** @type {Props} */
    let {
        value=$bindable(),
        for:_for=undefined,
        ...props
    } = $props()
</script>

<label
    for={_for}
    {...props}
>
    {#if typeof value === "function"}
        {@render value()}
    {:else if typeof value === "string" && (value.includes("\n") || value.includes("# "))}
        {@html marked.parse(value)}
    {:else if typeof value === "string"}
        {@html marked.parseInline(value)}
    {:else}
        {value}
    {/if}
</label>

<style>
    label {
        hyphens: auto;
        line-height: 1em;
    }
</style>