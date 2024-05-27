<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import PresentationCard from '$lib/components/PresentationCard/PresentationCard.svelte';

    export let data: PageData;
</script>

<div class="flex flex-col w-full">

    <div class="h-32  bg-teal-800 w-full text-gray-100 m-1">

        <p class="text-3xl text-center">
            Bienvenue sur Bookland, la plateforme de recherche des mémoires.
        </p>

        <p class="text-lg text-center my-3">Explorez les mémoires mémoires, trouvez une source d'inspiration pour vos
            recherches</p>

        <!-- <span class="font-bold">Bookland</span> vous permet de 
            
            <p class="text-xl py-2">
               .
            </p>
            <p class="text-xl py-2">
                Connectez-vous pour consulter les mémoires de vos collègues ou enrichir votre collection personnelle.
            </p> -->
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
                    <Icon icon="healthicons:register-book-outline" class="text-teal-500" height={70} width={70} />
                </svelte:fragment>
            </PresentationCard>
    
            <PresentationCard title="Découvrez les mémoires de licence, master et doctorat de votre pays">
                <svelte:fragment slot="icon">
                    <Icon icon="healthicons:register-book-outline" class="text-teal-500" height={70} width={70} />
                </svelte:fragment>
            </PresentationCard>

        </div>

    </div>

</div>