<script>
    import { setContext } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} flush No padding on tab buttons
     * @property {boolean} small Smaller icon on tab buttons
     * @property {boolean} tight Less padding on tab buttons
     * @property {boolean} large Larger icon on tab buttons
     * @property {boolean} comfy More padding on tab buttons
     * @property {boolean} center Center content within tab button
     * @property {boolean} disabled Disable tab navigation
     * @property {object<any>} props Other props are passed through to the underlying <div>
     */

    /** @type {Props} */
    let {
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        stretch=false,
        center=false,
        disabled=false,
        children,
        ...props
    } = $props()

    let context = $state({
        selection: undefined,
        tabs: {},
        pages: {}
    })
    setContext("einkui-notebook", context)
</script>


<div 
    class=container
    class:stretch
    {...props}
>
    <div
        class=notebook-tabs
    >
        {#each Object.values(context.tabs) as tab}
            {@render tab({
                flush: flush,
                small: small,
                tight: tight,
                large: large,
                comfy: comfy,
                center: center,
                disabled: disabled
            })}
        {/each}
        {@render children?.()}
    </div>
    {@render context.pages[context.selection]?.({
        disabled: disabled
    })}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        min-height: 0;
    }
    .notebook-tabs {
        display: flex;
        flex-direction: row;
    }
    .stretch {
        flex-grow: 1;
    }
</style>