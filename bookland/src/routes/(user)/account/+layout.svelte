<script lang="ts">
    import SideMenuNavigationLink from '$lib/components/SideMenuNavigationLink/SideMenuNavigationLink.svelte';
    import Icon from '@iconify/svelte';

    import type { LayoutData } from './$types';
    
    export let data:LayoutData;

    
</script>

<div class="w-full h-full flex flex-row space-x-4">
    <div class="flex w-64 py-3 ms-2">
        <div class="bg-teal-50 w-full h-full shadow-teal-300 shadow-sm border rounded-sm px-2 py-4 space-y-1">

            <SideMenuNavigationLink title="Accueil" url="/account">
                <svelte:fragment slot="icon">
                    <Icon icon="mage:dashboard-chart-fill" color="orange" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Mes Mémoires" url="/account/memoires">
                <svelte:fragment slot="icon">
                    <Icon icon="wpf:books" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Propositions" url="/account/propose">
                <svelte:fragment slot="icon">
                    <Icon icon="mdi:book-plus" color="green" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Mon Compte" url="/account/profile">
                <svelte:fragment slot="icon">
                    <Icon icon="solar:user-bold" color="darkorange" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>
            
        </div>
    </div>
    
    <div class="w-full">
        <slot />
    </div>
    
</div>
