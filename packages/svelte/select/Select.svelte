<script>
    import { Button } from "../button";
    import { Icon } from "../icon";
    import { Label } from "../label";
    import { Array, ArrayItem } from "../array";
    import { DetailsButton } from "../details";
    import { DialogButton } from "../dialog";
    import InputContainer from "../input/InputContainer.svelte";
    import { setContext } from "svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {boolean} selection Currently selected value from options
     * @property {string|Snippet} label Label for this control, or snippet to render in its place
     * @property {boolean} flush No padding on button, dialog and options array
     * @property {boolean} tight Less padding on button, dialog and options array
     * @property {boolean} comfy More padding on button, dialog and options array
     * @property {boolean} horizontal Arrange options array horizontally rather than vertically
     * @property {Snippet} children Child elements are rendered after options array in dialog
     * @property {object<any>} props Other props are passed through to the underlying <Details>
     */

    /** @type {Props} */
    let {
        selection=$bindable(),
        label:_label=undefined,
        flush=false,
        tight=false,
        comfy=false,
        horizontal=false,
        children,
        ...props
    } = $props()

    // operate on a temporary state which is applied on OK
    let temp = $state.raw();
    // context to pass to Option elements
    let context = $state({
        getSelection: () => temp,
        setSelection: (value) => temp = value,
        options: {}
    })
    setContext("einkui-select", context);    
</script>

<InputContainer 
    label={_label}
    line
>
    {#snippet ctrl(id, parentProps)}
        <DetailsButton
            icon={context.options[selection]?.icon || context.placeholder?.icon}
            ontoggle={(evt, expanded) => {
                // only on open, not on close
                if (!expanded) return
                // update temp on open
                temp = $state.snapshot(selection)
            }}
            flush={flush}
            title={_label}
            tight={tight}
            comfy={comfy}
            stretch
            square
            ghost
            {...props}
        >
            {#snippet summary()}
                <div style:display=none>
                    {@render children?.()}
                </div>
            {/snippet}

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

            {@render children?.()}

            {#snippet buttons()}
                <DialogButton 
                    action=OK 
                    onclick={evt => selection = $state.snapshot(temp)}
                />
                <DialogButton action=CANCEL />
            {/snippet}
        </DetailsButton>
    {/snippet}
</InputContainer>