<script>
    import { Button } from "../button";
    import { Dialog, DialogButton } from "../dialog";
    import { translate } from "..";

    let {
        expanded=$bindable(),
        ontoggle=(evt, expanded) => {},
        summary=undefined,
        toggle=undefined,
        buttons=undefined,
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
    onopen={evt => ontoggle?.(evt, true)}
    onclose={evt => ontoggle?.(evt, false)}
>
    {@render children?.()}
</Dialog>