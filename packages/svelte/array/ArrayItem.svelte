<script>
    import { getContext, onMount } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {Snippet} [children] Child elements are rendered in order in the parent Array
     * @property {object<any>} props Other props are passed through to the render call in the parent Array
     */

    /** @type {Props} */
    let {
        children,
        ...props
    } = $props();

    let array = getContext("einkui-array");

    let id = $props.id();

    onMount(() => {
        array[id] = [children, props]

        return () => delete array[id]
    })
</script>