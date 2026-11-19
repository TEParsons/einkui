<script>
    /**
     * @import { Snippet } from 'svelte'
     * 
     * @typedef Props
     * @property {string} src File path for the icon, or a character
     * @property {string} [alt] Alt text to display when the icon can't be loaded
     * @property {any} size Size of the icon
     * @property {object<any>} props Other props are passed through to the underlying <svg>, <img> or <span>
     */

    /** @type {Props} */
    let {
        src,
        alt=undefined,
        size="1em",
        ...props
    } = $props()
</script>

{#if String(src).match(/.*\.(svg)\#?.*/g)}
    <!-- scalable vector -->
    <svg 
        class=icon
        style:width={size}
        {...props}
    >
        <title>{alt || src}</title>
        <use href={src} />
    </svg>
{:else if String(src).match(/.*\.(png|jpg|jpeg)/g)}
    <!-- rasterised image -->
    <img 
        class=icon
        src={src} 
        alt={alt || src}
        style:width={size}
        {...props}
    />
{:else }
    <!-- utf-8 character -->
    <span
        class=icon
        style:font-family="var(--einkui-font-symbol)"
        style:font-size={size}
        {...props}
    >
        {src}
    </span>
{/if}

<style>
    .icon {
        aspect-ratio: 1 / 1;
        object-fit: contain;
        flex-shrink: 0;
        text-align: center;
        align-self: center;
        justify-self: center;
        vertical-align: center;
    }
</style>