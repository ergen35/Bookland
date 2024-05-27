<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import PresentationCard from '$lib/components/PresentationCard/PresentationCard.svelte';
    import ShipCard from '$lib/components/Ship/ShipCard.svelte';
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
    import { taskDelay } from '$lib/utils';
    import BookCard from '$lib/components/BookCard/BookCard.svelte';

    export let data: PageData;
</script>

<div class="flex flex-col w-full">

    <div class="h-32  bg-teal-800 text-gray-100 m-1 py-4">

        <p class="text-3xl text-center">
            Bienvenue sur Bookland, la plateforme de recherche des mémoires.
        </p>

        <p class="text-lg text-center my-3">Explorez les mémoires mémoires, trouvez une source d'inspiration pour vos recherches</p>
    </div>


    <div class="flex px-10 py-4 w-full content-center items-center justify-center">

        <div class="space-x-10 flex">

            <PresentationCard title="Accédez à une immense collection de Mémoires aux thèmes multiples">
                <svelte:fragment slot="icon">
                    <Icon icon="healthicons:register-book-outline" class="text-teal-500" height={70} width={70} />
                </svelte:fragment>
            </PresentationCard>
    
            <PresentationCard title="Recherchez et trouvez rapidement le mémoire de votre choix.">
                <svelte:fragment slot="icon">
                    <Icon icon="fluent:box-search-24-regular"  class="text-teal-500" height={70} width={70}/>
                </svelte:fragment>
            </PresentationCard>
    
            <PresentationCard title="Découvrez les mémoires de licence, master et doctorat de votre pays">
                <svelte:fragment slot="icon">
                    <Icon icon="fluent:form-new-28-filled" class="text-teal-500" height={70} width={70}/>
                </svelte:fragment>
            </PresentationCard>

        </div>

    </div>

    <div class="flex">
        <div class="w-full content-center items-center justify-center mt-5 flex cursor-pointer">
            <div class="flex flex-row text-center content-center items-center justify-center space-x-1 border border-gray-300 px-3 rounded-md">
                <a href="/books/all" class="text-2xl">Explorer</a>
                <Icon icon="fluent:chevron-right-12-filled" class="text-slate-600 h-6 w-6" />
            </div>
        </div>
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

    <div class="flex w-full mt-6">
        <div class="w-full">
            {#await data.books}
                <div class="text-lg text-slate-800 text-center">Chargement...</div>
            {:then books}
                {#each books as book}
                    <!-- content here -->
                    <BookCard book={book}/>
                {:else}
                    <div class="italic text-center text-2xl mt-6">Aucun livre à afficher</div>
                {/each}
            {/await}
        </div>
    </div>

</div>