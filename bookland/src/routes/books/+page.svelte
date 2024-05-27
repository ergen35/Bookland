<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import PresentationCard from '$lib/components/PresentationCard/PresentationCard.svelte';
    import ShipCard from '$lib/components/Ship/ShipCard.svelte';

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
        <div class="w-full text-center mt-5">
            <a href="/books/all" class="underline text-2xl">Explorer</a>
        </div>
    </div>

    <div>
        <div class="flex flex-row space-x-3">
            <ShipCard title="Informatique" />
            <ShipCard title="Informatique" />
            <ShipCard title="Informatique" />
            <ShipCard title="Informatique" />
        </div>
    </div>

</div>