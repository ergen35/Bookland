<script lang="ts">
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

        <StatsCard title=" ">
            
        </StatsCard>
        </div>
    
    
    </div>

</div>
