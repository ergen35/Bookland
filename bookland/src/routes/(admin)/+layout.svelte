<script lang="ts">
    import SideMenuNavigationLink from '$lib/components/SideMenuNavigationLink/SideMenuNavigationLink.svelte';
    import Icon from '@iconify/svelte';
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>


<div class="w-full h-full flex flex-row space-x-4">
    
    <div class="flex w-64 py-3 ms-2">

        <div class="bg-teal-50 w-full h-full shadow-teal-300 shadow-sm border rounded-sm px-2 py-4 space-y-1">
            
            <SideMenuNavigationLink title="Acceuil" url="/admin/dashboard">
                <svelte:fragment slot="icon">
                    <Icon icon="mage:dashboard-chart-fill" color="darkorange" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Collection" url="/admin/manage-books">
                <svelte:fragment slot="icon">
                    <Icon icon="wpf:books" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Propositions" url="/admin/propositions">
                <svelte:fragment slot="icon">
                    <Icon icon="bi:bookmark-plus-fill" style="color: purple" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Universités" url="/admin/manage-schools">
                <svelte:fragment slot="icon">
                    <Icon icon="fa6-solid:school-circle-check" color='blue' height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Filières" url="/admin/manage-filieres">
                <svelte:fragment slot="icon">
                    <Icon icon="arcticons:classroom" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Cycles" url="/admin/manage-cycles">
                <svelte:fragment slot="icon">
                    <Icon icon="icon-park-solid:level" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Utilisateurs" url="/admin/manage-users">
                <svelte:fragment slot="icon">
                    <Icon icon="heroicons:users-20-solid" style="color: #fbc014" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

            <SideMenuNavigationLink title="Réglages" url="/admin/settings">
                <svelte:fragment slot="icon">
                    <Icon icon="solar:settings-bold-duotone" style="color: #db4614" height={28} width={28}  />
                </svelte:fragment>
            </SideMenuNavigationLink>

        </div>

    </div>
    
    <main class="flex-1">
        <slot />
    </main>

</div>
