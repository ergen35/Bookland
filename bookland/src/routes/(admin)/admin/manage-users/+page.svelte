<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    
    export let data: PageData;

</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Gestion d'Utilisateurs</span>
    </div>

    <div class="flex flex-col">

        <div class="flex flex-1">

            {#await data.usersTask}
                <Icon icon='gg:spinner' class="animate-spin" />
            {:then users}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[100px]">Id</Table.Head>
                            <Table.Head>Nom</Table.Head>
                            <Table.Head>E-mail</Table.Head>
                            <Table.Head>Date Inscription</Table.Head>
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {#each users as user,i (user.id)}
                            <Table.Row>
                                <Table.Cell class="font-medium">{i+1}</Table.Cell>
                                <Table.Cell>{user.fullname}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.createdAt.toLocaleString('fr')}</Table.Cell>
                                <Table.Cell class="text-right">
                                    <div>
                                        <Button class="bg-sky-500 hover:bg-sky-800">
                                            Détails
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>  
                </Table.Root>
            {/await}
            
        </div>
        
    </div>

</div>


