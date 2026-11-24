<script>
    import { Button } from "../button";
    import Icon from "../icon/Icon.svelte";

    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {number} value Value of the stepper
     * @property {number} [initial] Value to show changes relative to, if at all
     * @property {number} [min] Minimum value of the stepper, if any
     * @property {number} [max] Maximum value of the stepper, if any
     * @property {number} step Amount to increase/decrease by, default is 1
     * @property {(evt:PointerEvent) => undefined} onchange Function to call when value changes
     * @property {boolean} confirmation Has to be clicked a second time to confirm
     * @property {boolean} flush No padding
     * @property {boolean} small Smaller icon
     * @property {boolean} tight Less padding
     * @property {boolean} large Larger icon
     * @property {boolean} comfy More padding
     * @property {boolean} ghost Removes border to show just text/icon/dropdown arrow
     * @property {boolean} square Remove border-radius to square the corners
     * @property {boolean} stretch Allow this control to stretch within its layout
     * @property {boolean} disabled Disable the button
     * @property {object<any>} props Other props are passed through to the underlying <div>
     */

    /** @type {Props} */
    let {
        value=$bindable(),
        initial=$bindable(),
        min=undefined,
        max=undefined,
        step=1,
        onchange=(evt, value) => {},
        flush=false,
        small=false,
        tight=false,
        large=false,
        comfy=false,
        ghost=false,
        square=false,
        stretch=false,
        vertical=false,
        disabled=$bindable(),
        ...props
    } = $props()

    // clip value to within min and max
    $effect(() => {
        // clip to max
        if (max !== undefined && value > max) {
            value = max
        }
        // clip to min
        if (min !== undefined && value < min) {
            value = min
        }
    })
</script>

<div 
    class=container
    class:flush
    class:tight
    class:comfy
    class:large
    class:small
    class:vertical
    {...props}
>
    <Button 
        label="-"
        onclick={evt => value -= step}
        primary
        flush={flush}
        small={small}
        tight={tight}
        large={large}
        comfy={comfy}
        ghost={ghost}
        square={square}
        disabled={disabled || value <= min}
    />
    <div 
        class=value
        class:stretch
    >
        {#if initial !== undefined && initial !== value}
            <div 
                class=initial
            >
                {initial}
                <Icon
                    src="🡒"
                    size=.6em
                />
            </div>
        {/if}
        {value}
    </div>
    <Button 
        label="+"
        onclick={evt => value += step}
        primary
        flush={flush}
        small={small}
        tight={tight}
        large={large}
        comfy={comfy}
        ghost={ghost}
        square={square}
        disabled={disabled || value >= max}
    />
</div>

<style>
    .container,
    .value,
    .initial {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .container {
        gap: .5em;
    }
    .value,
    .initial {
        gap: .25em;
    }
    .initial {
        color: var(--einkui-color-mantle);
        font-size: .8em;
    }


    /* Padding */
    .container {
        gap: .5em;
    }
    .container.flush {
        gap: 0;
    }
    .container.tight {
        gap: .3em;
    }
    .container.comfy {
        gap: .8em;
    }

    /* Sizing */
    .container {
        font-size: 1em;
    }
    .container.large {
        font-size: 1.5em;
    }
    .container.small {
        font-size: .8em;
    }

    /* Layout */
    .stretch {
        flex-grow: 1;
    }
    .container.vertical {
        flex-direction: column-reverse;
    }
</style>