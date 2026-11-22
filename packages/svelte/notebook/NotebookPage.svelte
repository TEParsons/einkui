<script>
    import { getContext, onMount } from "svelte";
    import { useSwipe } from 'svelte-gestures';
    import { Button } from "../button";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {string|Snippet} [label] Label for this page's tab, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this page's tab, or a snippet to render in its place
     * @property {(evt:PointerEvent) => undefined} onselect Function to call when this page is selected
     * @property {boolean} flush No padding around page
     * @property {boolean} tight Less padding around page
     * @property {boolean} comfy More padding around
     * @property {boolean} stretch Allow this page's button to stretch within its layout
     * @property {boolean} initial Start off with this page selected, if no others are
     * @property {boolean} children Child elements are placed within the page
     * @property {object<any>} props Other props are passed through to this page's tab button
     */

    /** @type {Props} */
    let {
        label=undefined,
        icon=undefined,
        onselect=(evt, value) => {},
        flush=false,
        tight=false,
        comfy=false,
        stretch=false,
        initial=false,
        children,
        ...props
    } = $props()

    // resolve ID
    let _id = $props.id()
    let id = $derived(props.id || _id)
    // get context from notebook
    let context = getContext("einkui-notebook")
    // store tab and page in context
    onMount(() => {
        context.tabs[id] = tab
        context.pages[id] = page

        return () => {
            delete context.tabs[id]
            delete context.pages[id]
            if (context.selection === id) context.selection = undefined
        }
    })
    // if nothing is selected and this is the initial page, select it
    $effect(() => {
        if (initial && context.selection === undefined) context.selection = id
    })
</script>

{#snippet tab(parentProps)}
    <Button 
        label={label}
        icon={icon}
        onclick={evt => {
            // select self
            context.selection = id
            // run on select function
            onselect(evt, id)
        }}
        primary={context.selection !== id}
        ghost={context.selection === id}
        square
        flush={parentProps.flush}
        small={parentProps.small}
        tight={parentProps.tight}
        large={parentProps.large}
        comfy={parentProps.comfy}
        center={parentProps.center}
        stretch={stretch}
        disabled={parentProps.disabled}
        {...props}
    />
{/snippet}

{#snippet page(parentProps)}
    <div 
        class=notebook-page
        class:flush
        class:tight
        class:comfy
        {...useSwipe(
            evt => {
                // skip if disabled
                if (parentProps.disabled) return
                // we only care about swipes
                if (evt.type === "swipe") {
                    // get current index
                    let index = Object.keys(context.pages).indexOf(context.selection)
                    // on swipe left, go to the next page
                    if (evt.detail.direction === "left") {
                        index += 1
                    }
                    // on swipe right, go to the previous page
                    if (evt.detail.direction === "right") {
                        index -= 1
                    }
                    // clamp index within range
                    index = Math.min(Math.max(index, 0), Object.keys(context.pages).length);
                    // set page id from index
                    context.selection = Object.keys(context.pages)[index];
                }
            }, 
            () => ({ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y' }), 
            {}
        )}
    >
        {@render children?.()}
    </div>
{/snippet}

<style>
    .notebook-page {
        flex-grow: 1;
    }
</style>