<script lang="ts">
    import Icon from "@iconify/svelte";
    export let count: number
    export let title: string

</script>


<div class="w-72 border border-gray-400 shadow-sm bg-yellow-50 py-2 px-3 rounded-md cursor-pointer flex space-x-3 hover:scale-110 transition-all duration-500">
    <div class="flex h-14 w-14 border rounded-full border-gray-500 bg-teal-50 justify-center items-center content-center">
        <slot name="icon">
            <Icon icon="wpf:books" color="purple" height={24} width={24}  />
        </slot>
    </div>
    <div class="flex-1 justify-center content-center">
        <div class="flex flex-col">
            <span class="font-semibold font-mono text-xl">{title}</span>
            <span class="font-semibold font-mono text-sm text-purple-500">Total: {count}</span>
        </div>
    </div>
</div>

