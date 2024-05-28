<script lang="ts">
    import Icon from "@iconify/svelte";

    export let title: string
    export let url: string
</script>

<a href={url} class="block text-center border w-full bg-teal-50 shadow-sm py-2 px-2 hover:border-white hover:bg-gray-800 hover:text-white rounded-md transition-all duration-200">
    <div class="flex flex-row space-x-2">
        <div>
            <slot name="icon">
                <Icon icon="mage:dashboard-circle-bar-fill" height={30} width={30}/>
            </slot>
        </div>
        <div class="flex-1 text-start justify-center items-center content-center">{title} </div>
        <div class="justify-center items-center content-center flex">
            <Icon icon="icon-park-outline:right-c" height={18} width={18} />
        </div>
    </div>
</a>