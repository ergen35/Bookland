<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    import Icon from '@iconify/svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { buttonVariants } from '$lib/components/ui/button';
    import { invalidateAll } from '$app/navigation';

    export let data: PageData;

    let cycleName = '';
    $: dialogOpened = false;

    async function createSchool(){

        const response = await fetch('/admin/manage-cycles', {
            method: 'POST',
            body: JSON.stringify({ name: cycleName })
        })

        if(response.ok){
            dialogOpened = false; cycleName = ''; 
            invalidateAll();
        }
    }
</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Cycles</span>
    </div>

    <div class="flex flex-col">

        <div class="flex my-4 justify-end items-end me-4">
            <Dialog.Root bind:open={dialogOpened}>
                <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
                    <div class="flex flex-row space-x-2 justify-center content-center items-center">
                        <Icon icon="fluent:notebook-add-20-filled"  height={20} width={20}/>
                        <span> Ajouter </span>
                    </div>
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px] min-w-[600px]">
                <Dialog.Header>
                    <Dialog.Title class="mb-1 text-center text-teal-700">Ajouter un Cycle</Dialog.Title>
                </Dialog.Header>
                    <div class="flex flex-col space-y-2">

                        <div class="items-center flex flex-row space-x-4">
                            <Label for="schoolname" class="text-left w-24">Nom</Label>
                            <Input id="schoolname" required minlength={5} maxlength={190} bind:value={cycleName} class="col-span-3" />
                        </div>
                    </div>
                <Dialog.Footer>
                    <Button on:click={createSchool} type="submit" class="bg-teal-800">
                        <div class="flex flex-row content-center items-center justify-center space-x-2">
                            <Icon icon="fluent:save-28-filled"  height={20} width={20}/>
                            <span>Enregister </span>
                        </div>
                    </Button>
                </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>

        <div class="flex flex-1">

            {#await data.cycles}
                <Icon icon='gg:spinner' class="animate-spin" />
            {:then cycles}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[100px]">Id</Table.Head>
                            <Table.Head>Nom</Table.Head>
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {#each cycles as cycle,i (cycle.id)}
                            <Table.Row>
                                <Table.Cell class="font-medium">{cycle.id}</Table.Cell>
                                <Table.Cell>{cycle.name}</Table.Cell>
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