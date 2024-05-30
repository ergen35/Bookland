<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    import Icon, { iconExists } from '@iconify/svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { buttonVariants } from '$lib/components/ui/button';
    import SelectionCombo from '$lib/components/SelectionCombo/SelectionCombo.svelte';
    import { invalidateAll } from '$app/navigation';
    
    export let data: PageData;

    let bookAddData = {
        title: '',
        author: '',
        universiteId: '',
        cycleId: '',
        filiereId: '',
        fileName: '',
        overseerName: '',
        pageCount: '',
        pricingModel: '',
        price: '',
        createdAt: ''
    }

    async function addBook(){

        const response = await fetch('/admin/manage-books', {
            method: 'POST',
            body: JSON.stringify(bookAddData)
        })

        if(response.ok){
            invalidateAll()
            isDialogOpened = false;
        }

    }

    let isDialogOpened = false;

    $:  {

        if(!isDialogOpened){
            bookAddData = {
                title: '',
                author: '',
                universiteId: '',
                cycleId: '',
                filiereId: '',
                fileName: '',
                overseerName: '',
                pageCount: '',
                pricingModel: '',
                price: '',
                createdAt: ''
            }
        }
    }

</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Mémoires</span>
    </div>

    <div class="flex flex-col">

        <div class="flex my-4 justify-end items-end me-4">
            <Dialog.Root bind:open={isDialogOpened}>
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
                  
                    {#await data.allData}
                        <div class="text-center">
                            <Icon icon='gg:spinner' class="animate-spin" />
                        </div>
                    {:then [universites, filieres, cycles]}
                        <div class="flex flex-col space-y-2">
                            
                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="universite" class="text-left w-24">Université</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.universiteId} dataArray={universites.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélectionner Université" noDataText="Aucune Université trouvée" />
                                </div>
                            </div>

                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="cycle" class="text-left w-24">Cycle</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.cycleId} dataArray={cycles.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélectionner Cycle" noDataText="Aucun Cycle trouvé" />
                                </div>
                            </div>

                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="filiere" class="text-left w-24">Filière</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.filiereId} dataArray={filieres.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélectionner Filière" noDataText="Aucune Filière trouvée" />
                                </div>
                            </div>

                            <!-- <div class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                                <div class="w-full flex flex-col space-y-2">
                                    <Label for="title" class="text-center w-full">Cycle</Label>
                                    <div class="w-full">
                                        <SelectionCombo dataArray={cycles.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélection Cycle" noDataText="Aucun Cycle trouvé" />
                                    </div>
                                </div>
                                <div class="w-full flex flex-col  space-y-2">
                                    <Label for="title" class="text-center w-full">Filière</Label>
                                    <div class="w-full">
                                        <SelectionCombo dataArray={filieres.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélection Filière" noDataText="Aucune Filière trouvée" />
                                    </div>
                                </div>
                            </div> -->

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="title" class="text-left w-24">Thème</Label>
                                <Input id="title" placeholder="Thème du Mémoire" bind:value={bookAddData.title} class="col-span-3" />
                            </div>
                            <div class="items-center flex flex-row space-x-4">
                                <Label for="author" class="text-left w-24">Auteur</Label>
                                <Input id="author" placeholder="Auteur" bind:value={bookAddData.author} class="col-span-3" />
                            </div>
                            <div class="items-center flex flex-row space-x-4">
                                <Label for="overseer" class="text-left w-24">Superviseur</Label>
                                <Input id="overseer" placeholder="Nom du Superviseur" bind:value={bookAddData.overseerName} class="col-span-3" />
                            </div>
                            <!-- <div class="items-center flex flex-row space-x-4">
                                <Label for="price" class="text-left w-24">Prix</Label>
                                <Input id="price" type="number" step={5} min={500} value="500" class="col-span-3" />
                            </div> -->

                            <div class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                                <div class="w-full flex flex-col  space-y-2">
                                    <div class="w-full">
                                        <SelectionCombo bind:value={bookAddData.pricingModel} dataArray={[{ value: 'Free', label: 'Gratuit' }, { value: 'Paid', label: "Payant" }]} displayText="Modèle de Prix" />
                                    </div>
                                </div>
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="price" type="number" bind:value={bookAddData.price} step={5} min={500} placeholder="Prix" class="col-span-3" />
                                </div>
                            </div>

                            <div class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="price" type="number" bind:value={bookAddData.createdAt} step={1} min={1900} placeholder="Année de Publication" class="col-span-3" />
                                </div>
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="price" bind:value={bookAddData.pageCount} type="number" step={1} min={1} placeholder="Nbre. Pages" class="col-span-3" />
                                </div>
                            </div>

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="book-file" class="text-left w-24">Fichier</Label>
                                <Input id="book-file" bind:value={bookAddData.fileName} accept="application/pdf" type="file" class="col-span-3" />
                            </div>
                        </div>
                    {:catch error}
                        <div class="text-center flex flex-col">
                            <span>Impossible de Charger les Données nécessairees</span>
                        </div>
                    {/await}
                  <Dialog.Footer>
                    <Button on:click={() => { addBook(); }} class="bg-teal-800">
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
