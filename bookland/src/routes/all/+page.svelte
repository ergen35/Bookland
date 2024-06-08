<script lang="ts">
    import Input from '$lib/components/ui/input/input.svelte';
    import Icon from '@iconify/svelte';
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
    import ShipCard from '$lib/components/Ship/ShipCard.svelte';
    import BookCard from '$lib/components/BookCard/BookCard.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let isFiltering = false;
    let searchText = ''

    $: {
        isFiltering = searchText.length > 0
    }

</script>

<div class="flex flex-col w-full space-y-3">

    <div class="text-2xl text-teal-900 mt-2 flex flex-row self-center">
        <Icon icon="majesticons:search" height={35} width={35} />
        <span class="block ms-2">Parcourir tous les mémoires</span>
    </div>

    <div class="flex flex-row items-center content-center justify-center w-full">
        <Input type="search" bind:value={searchText} placeholder="Rechercher parmi les mémoires...." class="w-3/5 flex" />
        
        {#if isFiltering}
             <Icon icon="eos-icons:bubble-loading" class="ms-3" height={35} width={35}  />
        {/if}
    </div>


    <div class="pt-8">
        <div class="flex content-center justify-center">

            <div class="flex flex-row space-x-3 max-w-2xl">
                {#await data.categories}
                    <Skeleton class="px-3 py-1 bg-gray-700 shadow-sm rounded-full w-24 h-6" />
                {:then categories}
                    {#each categories as category}
                        {#key category.id}
                            <ShipCard title={category.name} />
                        {/key}
                    {:else}
                        <span>Aucune Catégorie</span>
                    {/each}
                {/await}
            </div>
        </div>
    </div>

    <div class="pt-1">
        <div class="flex content-center justify-center">

            <div class="flex flex-row space-x-3 max-w-2xl">
                {#await data.cycles}
                    <Skeleton class="px-3 py-1 bg-gray-700 shadow-sm rounded-full w-24 h-6" />
                {:then cycles}
                    {#each cycles as cycle}
                        {#key cycle.id}
                            <ShipCard title={cycle.name} />
                        {/key}
                    {:else}
                        <span>Aucun Cycle enregistré</span>
                    {/each}
                {/await}
            </div>
        </div>
    </div>

    <div class="flex flex-row w-full items-center justify-center content-center">
        <div class="w-full flex flex-row mb-5 items-center justify-center content-center">
            {#await data.books}
            <div class="text-lg text-slate-800 text-center">Chargement...</div>
            {:then books}
            <div class="flex flew-row flex-wrap w-full items-center justify-center content-center">
                {#each books as book}
                <BookCard book={book} showPayButton={data.session && data.session?.sessionId ? true : false} />
                {:else}
                <div class="italic text-center text-2xl mt-6">Aucun livre à afficher</div>
                {/each}
            </div>
            {/await}
        </div>
    </div>
</div>