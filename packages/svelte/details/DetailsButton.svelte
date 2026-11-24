<script>
    import Details from "./Details.svelte";
    import { Button } from "../button";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} expanded Whether the dialog is shown
     * @property {(evt:undefined, expanded:boolean) => undefined} ontoggle Function to execute when the expanded state changes
     * @property {string|Snippet} [title] Title for the dialog
     * @property {string|Snippet} [label] Label for this button, or a snippet to render in its place
     * @property {string|Snippet} [icon] Path to the icon for this button, or a snippet to render in its place
     * @property {boolean} flush No padding on the button and dialog
     * @property {boolean} small Smaller icon on the button
     * @property {boolean} tight Less padding on the button and dialog
     * @property {boolean} large Larger icon on the button
     * @property {boolean} comfy More padding on the button and dialog
     * @property {boolean} ghost Removes button border to show just text/icon
     * @property {boolean} square Removes button border-radius to square the corners
     * @property {boolean} stretch Allow this button to stretch within its layout
     * @property {boolean} center Center content within this button
     * @property {boolean} disabled Disable the button
     * @property {Snippet} [buttons] Buttons to include in the dialog
     * @property {Snippet} children Child elements are rendered in the dialog
     * @property {object<any>} props Other props are passed through to the underlying <Dialog>
     */

    /** @type {Props} */
    let {
        expanded=$bindable(),
        ontoggle=(evt, expanded) => {},
        title=undefined,
        label=undefined,
        icon=undefined,
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        ghost=false,
        square=false,
        stretch=false,
        center=false,
        buttons=undefined,
        children,
        ...props
    } = $props()
</script>

<Details
    bind:expanded={expanded}
    ontoggle={ontoggle}
    title={title}
    buttons={buttons}
    flush={flush}
    tight={tight}
    comfy={comfy}
    children={children}
    {...props}
>
    {#snippet toggle(getExpanded, setExpanded)}
        <Button 
            label={label}
            icon={icon}
            onclick={evt => setExpanded(true)}
            primary={getExpanded()}
            flush={flush}
            small={small}
            tight={tight}
            large={large}
            comfy={comfy}
            ghost={ghost}
            square={square}
            stretch={stretch}
            center={center}
        />
    {/snippet}
</Details>