<script>
    import { Button } from "../button";
    import { Icon } from "../icon";
    import { Label } from "../label";
    import { Array, ArrayItem } from "../array";
    import { Dialog, DialogButton } from "../dialog";
    import { setContext } from "svelte";

    let {
        selection=$bindable(),
        flush=false,
        tight=false,
        comfy=false,
        horizontal=false,
        children,
        ...props
    } = $props()

    // context to pass to Option elements
    let context = $state({
        getSelection: () => selection,
        setSelection: (value) => selection = value,
        options: {}
    })
    setContext("einkui-select", context);
    // keep track of value on open to restore it on cancel
    let restore = $state.raw();
    // state which shows the dialog
    let showDlg = $state.raw(false);
</script>

<div class=container>
    <Button 
        icon={context.options[selection]?.icon || context.placeholder?.icon}
        onclick={evt => showDlg = true}
        flush={flush}
        tight={tight}
        comfy={comfy}
        stretch
        square
        ghost
    >
        {#snippet label()}
            <Label
                value={context.options[selection]?.label || context.placeholder?.label}
            />
            <div style:flex-grow=1></div>
            <Icon
                src=▼
                size=.5em
            />
        {/snippet}
    </Button>
    <div style:display=none>
        {@render children?.()}
    </div>
</div>



<Dialog
    bind:shown={showDlg}
    onopen={evt => restore = $state.snapshot(selection)}
    flush={flush}
    tight={tight}
    comfy={comfy}
>
    <Array 
        flush={flush}
        tight={tight}
        comfy={comfy}
        horizontal={horizontal}
        ghost
    >
        {#each Object.values(context.options) as option}
            <ArrayItem>
                {@render option.snippet?.()}
            </ArrayItem>
        {/each}
    </Array>

    {#snippet buttons()}
        <DialogButton action=OK />
        <DialogButton 
            action=CANCEL 
            onclick={evt => selection = $state.snapshot(restore)}
        />
    {/snippet}
</Dialog>

<style>
    .container {
        border-bottom: 1px solid var(--einkui-color-overlay);
    }
</style>