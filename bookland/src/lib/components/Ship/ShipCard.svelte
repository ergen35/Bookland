<script lang="ts">
    import { slide } from "svelte/transition";

    export let title: string;
</script>

<div in:slide={{ axis: 'x', duration: 500, delay: 350 }} class="px-3 py-1 bg-teal-900 text-white shadow-sm rounded-full cursor-pointer hover:border-teal-900 hover:border hover:text-black hover:bg-transparent">
    <span>{title}</span>
</div>