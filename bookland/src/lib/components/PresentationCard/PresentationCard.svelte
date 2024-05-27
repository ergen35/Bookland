<script lang="ts">
    import Icon from "@iconify/svelte";

    export let title: string;
</script>

<div class="h-60 w-80 bg-gray-50 p-3 shadow-md rounded-md text-gray-600 hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-105">
    <div class="flex flex-col h-full">
        
        <div class="flex flex-1 content-center items-center justify-center">
            <p>
                <slot name="icon" />
            </p>
        </div>

        <div class="flex">
            <p class="text-lg text-center">{title}</p>
        </div>
    </div>
</div>