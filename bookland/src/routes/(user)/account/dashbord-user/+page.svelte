<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>



<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Tableau de bord</span>
    </div>

    <div class="flex flex-col flex-wrap">
        
        <div class="flex flex-row space-x-6">

            <StatsCard title="Nombres de memoires total : " count={}>
                <svelte:fragment slot="icon">
                    <Icon icon="wpf:books" color:green class="text-orange-900" height={24} width={24}  />
                </svelte:fragment>
            </StatsCard>
        </div>
    
    
    </div>

</div>
