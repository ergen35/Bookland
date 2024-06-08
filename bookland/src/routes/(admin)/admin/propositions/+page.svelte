<script lang="ts">
    import type { PageData } from './$types';
    // import Icon from ""
    import * as Table from "$lib/components/ui/table/index.js";
    
    export let data: PageData;
</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Propositions de Mémoires</span>
    </div>

    <div class="flex flex-col space-y-5">
        <div class="flex flex-1">
            
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[100px]">Id</Table.Head>
                        <Table.Head>Nom</Table.Head>
                        <Table.Head>Proposé par</Table.Head>
                        <Table.Head>Proposé le</Table.Head>
                        <Table.Head>Fichier</Table.Head>
                        <Table.Head class="text-right">Actions</Table.Head>
                    </Table.Row>
                </Table.Header>

                <!-- <Table.Body>
                </Table.Body>   -->
            </Table.Root>
            
        </div>
        <div class="w-full text-center">
            Aucune proposion
        </div>
    </div>
</div>