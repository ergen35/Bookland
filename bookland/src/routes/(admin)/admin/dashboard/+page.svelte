<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
    
    export let data: PageData;
</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Tableau de bord</span>
    </div>

    <div class="flex flex-col flex-wrap">
        
        <div class="flex flex-row space-x-6">

            <StatsCard title="Mémoires" count={data.booksCount}>
                <svelte:fragment slot="icon">
                    <Icon icon="wpf:books" class="text-orange-900" height={24} width={24}  />
                </svelte:fragment>
            </StatsCard>
    
            <StatsCard title="Filières" count={data.filieresCount}>
                <svelte:fragment slot="icon">
                    <Icon icon="arcticons:classroom" height={24} width={24}  />
                </svelte:fragment>
            </StatsCard>

            <StatsCard title="Utilisateurs" count={data.usersCount}>
                <svelte:fragment slot="icon">
                    <Icon icon="arcticons:classroom" height={24} width={24}  />
                </svelte:fragment>
            </StatsCard>

        </div>
    
    
    </div>

</div>
