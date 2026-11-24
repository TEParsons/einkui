<script>
    import { Button } from "../button";
    import { Dialog, DialogButton } from "../dialog";
    import { translate } from "..";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} expanded Whether the dialog is shown
     * @property {(evt:undefined|"OK"|"CANCEL"|"YES"|"NO", expanded:boolean) => undefined} ontoggle Function to execute when the expanded state changes
     * @property {(evt:undefined) => undefined} onopen Function to call when the dialog opens
     * @property {(evt:"OK"|"CANCEL"|"YES"|"NO") => undefined} onclose Function to call when the dialog closes
     * @property {string|Snippet} title Title for the dialog
     * @property {Snippet} [summary] Content to show as a summary when not expanded
     * @property {Snippet} [toggle] Button to toggle expanded states, leave as undefined to use the default "Show more..." - snippet will receive get/set functions for the expanded state
     * @property {Snippet} [buttons] Buttons to include in the dialog
     * @property {boolean} flush No padding on dialog
     * @property {boolean} tight Less padding on dialog
     * @property {boolean} comfy More padding on dialog
     * @property {Snippet} children Child elements are rendered in the dialog
     * @property {object<any>} props Other props are passed through to the underlying <Dialog>
     */

    /** @type {Props} */
    let {
        expanded=$bindable(),
        ontoggle=(evt, expanded) => {},
        onopen=(evt) => {},
        onclose=(evt) => {},
        title=undefined,
        summary=undefined,
        toggle=undefined,
        buttons=undefined,
        flush=false,
        tight=false,
        comfy=false,
        children,
        ...props
    } = $props()

    // functions for controlling expanded from within a snippet
    const getExpanded = () => expanded;
    const setExpanded = (value) => expanded = value;
</script>

{#snippet defaultToggle(getExpanded, setExpanded)}
    <Button 
        label={translate("Show more...")}
        onclick={evt => setExpanded(true)}
        primary={getExpanded()}
        flush={flush}
        tight={tight}
        comfy={comfy}
        stretch
        ghost
    />
{/snippet}

{#snippet defaultButtons()}
    <DialogButton action=OK />
{/snippet}

<div class=details>
    <div class=summary>
        {@render summary?.()}
    </div>
    {@render (toggle || defaultToggle)(getExpanded, setExpanded)}
</div>

<Dialog
    bind:shown={expanded}
    buttons={buttons || defaultButtons}
    onopen={evt => {
        // run ontoggle function
        ontoggle?.(evt, true)
        // run onopen function
        onopen?.(evt)
    }}
    onclose={evt => {
        // run ontoggle function
        ontoggle?.(evt, false)
        // run onclose function
        onclose?.(evt)
    }}
    title={title}
    flush={flush}
    tight={tight}
    comfy={comfy}
    {...props}
>
    {@render children?.()}
</Dialog>