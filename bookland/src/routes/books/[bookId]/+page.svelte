<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
    import ShipCard from '$lib/components/Ship/ShipCard.svelte';
    
    export let data: PageData;
</script>


<div class="flex flex-row w-full h-5/6 py-8 px-20">
    <div class="flex w-1/2">
       <div class="flex flex-col w-full">
            <Icon icon="eos-icons:loading" class='absolute left-20' height={40} width={40} />
            <Skeleton class="px-3 py-1 bg-gray-700 shadow-sm h-full w-2/3" />
            <div class="text-slate-700 mt-3">Chargement de la courverture...</div>
       </div>
    </div>
    <div class="flex flex-col w-1/2 space-y-6">
        <div class="flex flex-wrap text-start">
            <span class="text-3xl">
                {data.book.title}
            </span>
        </div>
        <div class="text-slate-700 text-xl">
            <span class="text-teal-700">Auteur(e):</span> {data.book.author}
        </div>
        <div class="text-slate-700 text-lg">
            {#if data.book.pricingModel == 'Free'}
                <span>Prix: Gratuit</span>
            {:else}
                <span class="text-teal-700">Prix:</span> {data.book.price} Fcfa
            {/if}
        </div>
        <div class="text-slate-700 text-lg">
            <span class="text-teal-700">Année d'édition:</span> {data.book.creationYear}
        </div>
        <div>
            Mots-Clés: 
            <div class="flex flex-row flex-wrap space-x-1 mt-1 mx-1">
                {#if data.book.tags}
                    {#each data.book.tags.split('|') as tag}
                        <ShipCard title={tag} />
                    {:else}
                        <span>Aucun mot clé</span>
                    {/each}
                {:else}
                     <!-- else content here -->
                {/if}
            </div>
        </div>
        <div class="">
            <a href="/account/payment?book={data.book.id}" class="bg-blue-700 text-white font-bold py-3 px-4 rounded mb-2 text-sm">
                Acheter
            </a>
        </div>
        <div>
            <span class="text-teal-700 text-xl">Résumé</span>
            <div>
               {#if data.book.summary}
                    <span>{data.book.summary}</span>
               {:else}
                    <span>Aucun résumé fourni</span>
               {/if}
            </div>
        </div>
    </div>
</div>