<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    import Icon, { iconExists } from '@iconify/svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { buttonVariants } from '$lib/components/ui/button';
    
    export let data: PageData;


</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Mémoires</span>
    </div>

    <div class="flex flex-col">

        <div class="flex my-4 justify-end items-end me-4">
            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
                    <div class="flex flex-row space-x-2 justify-center content-center items-center">
                        <Icon icon="fluent:notebook-add-20-filled"  height={20} width={20}/>
                        <span> Ajouter </span>
                    </div>
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px] min-w-[600px]">
                  <Dialog.Header>
                    <Dialog.Title class="mb-4 text-center">Ajouter un Mémoire</Dialog.Title>
                    <!-- <Dialog.Description>
                      Make changes to your profile here. Click save when you're done.
                    </Dialog.Description> -->
                  </Dialog.Header>
                    <div class="flex flex-col space-y-2">
                        <div class="items-center flex flex-row space-x-4">
                            <Label for="title" class="text-left w-24">Thème</Label>
                            <Input id="title" class="col-span-3" />
                        </div>
                        <div class="items-center flex flex-row space-x-4">
                            <Label for="author" class="text-left w-24">Auteur</Label>
                            <Input id="author" class="col-span-3" />
                        </div>
                        <div class="items-center flex flex-row space-x-4">
                            <Label for="price" class="text-left w-24">Prix</Label>
                            <Input id="price" type="number" step={5} min={500} value="500" class="col-span-3" />
                        </div>
                        <div class="items-center flex flex-row space-x-4">
                            <Label for="book-file" class="text-left w-24">Fichier</Label>
                            <Input id="book-file" type="file" class="col-span-3" />
                        </div>
                    </div>
                    <!-- <div class="grid gap-4 py-4">
                    </div> -->
                  <Dialog.Footer>
                    <Button type="submit">
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

            {#await data.books}
                <Icon icon='gg:spinner' class="animate-spin" />
            {:then books}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[100px]">Id</Table.Head>
                            <Table.Head>Titre</Table.Head>
                            <Table.Head>Prix</Table.Head>
                            <Table.Head>Ajouté le</Table.Head>
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {#each books as book,i (book.id)}
                            <Table.Row>
                                <Table.Cell class="font-medium">{book.id}</Table.Cell>
                                <Table.Cell>{book.title}</Table.Cell>
                                <Table.Cell>{book.price}</Table.Cell>
                                <Table.Cell>{book.createdAt.toDateString()}</Table.Cell>
                                <Table.Cell class="text-right">
                                    <div>
                                        <button>Détails</button>
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
