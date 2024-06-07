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
    import ConfirmationPrompt from '$lib/components/ConfirmationPrompt/ConfirmationPrompt.svelte';
    //@ts-ignore
    import Tags from "svelte-tags-input";
    import type { Book } from '@prisma/client';
    import { page } from '$app/stores';

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
        createdAt: '',
        tags: []
    }


    let isDialogOpened = false;
    let isDeleteConfirmationOpened = false;
    let selectedBookId: number | undefined = undefined;
    let bookAddForm: HTMLFormElement | null = null
    let platImageFormField: HTMLInputElement | null = null;
    let isAddingBook = false;

    $: {

        if (!isDialogOpened) {
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
                createdAt: '',
                tags: []
            }
        }
    }

    async function addBook() {

        if(bookAddForm){

            if(bookAddForm.checkValidity() && bookAddData.cycleId && bookAddData.universiteId && bookAddData.filiereId && bookAddData.pricingModel){

                bookAddData.fileName = window.crypto.randomUUID().toString().substring(14).replaceAll('-', '') + ".pdf";

                const response = await fetch('/admin/manage-books', {
                    method: 'POST',
                    body: JSON.stringify(bookAddData)
                })
        
                if (response.ok) {

                    //upload book
                    const book: Book = await response.json();
                    if(book.id){

                        if(platImageFormField){
                            if(platImageFormField.files && platImageFormField.files.length > 0){

                                try {
                                    const file = platImageFormField.files[0]

                                    const formData = new FormData();
                                    formData.append('file', file, bookAddData.fileName);

                                    const fileUploadResponse = await fetch(`/admin/manage-books?id=${book.id}`, {
                                        method: 'PUT',
                                        body: formData
                                    })

                                    if (fileUploadResponse.ok) {

                                        invalidateAll()
                                        isDialogOpened = false;
                                    } else {
                                        alert("Erreur lors de l'upload du fichier : " + fileUploadResponse.statusText);
                                    }
                                    
                                } catch (error) {
                                    alert("Erreur lors de l'upload du fichier");
                                }
                            }
                        }
                    }
                }
            }
            else {
                alert("Veuillez renseigner tous les champs obligatoires")
            }
        }


    }

    async function showConfirmationPrompt(id: number) {
        selectedBookId = id;
        //show prompt
        isDeleteConfirmationOpened = true;

    }

    async function deleteBook() {
        if(!selectedBookId){
            return;
        }
        const response = await fetch(`/admin/manage-books?id=${selectedBookId}`, {
            method: 'DELETE'
        });

        if(response.ok){
            invalidateAll();
        }
        
        selectedBookId = undefined;
    }

</script>

<ConfirmationPrompt action={deleteBook} bind:isOpened={isDeleteConfirmationOpened} cancelText="Annuler" okText="Confirmer"
            descriptionText="Voulez-vous vraiment supprimer ce Mémoire?" questionText="Supprimer ce mémoire" />

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Mémoires</span>
    </div>

    <div class="flex flex-col">

        <div class="flex my-4 justify-end items-end me-4">
            <Dialog.Root bind:open={isDialogOpened}>
                <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
                    <div class="flex flex-row space-x-2 justify-center content-center items-center">
                        <Icon icon="fluent:notebook-add-20-filled" height={20} width={20} />
                        <span> Ajouter </span>
                    </div>
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px] min-w-[600px]">
                    <Dialog.Header>
                        <Dialog.Title class="mb-4 text-center">Ajouter un Mémoire</Dialog.Title>
                    </Dialog.Header>

                    {#await data.allData}
                        <div class="text-center">
                            <Icon icon='gg:spinner' class="animate-spin" />
                        </div>
                    {:then [universites, filieres, cycles]}
                        <form class="flex flex-col space-y-2" bind:this={bookAddForm}>

                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="universite" class="text-left w-24">Université</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.universiteId} dataArray={universites.map((u)=> {
                                        return { value: u.id.toString(), label: u.name } })} displayText="Sélectionner
                                        Université" noDataText="Aucune Université trouvée" />
                                </div>
                            </div>

                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="cycle" class="text-left w-24">Cycle</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.cycleId} dataArray={cycles.map((u)=> { return {
                                        value: u.id.toString(), label: u.name } })} displayText="Sélectionner Cycle"
                                        noDataText="Aucun Cycle trouvé" />
                                </div>
                            </div>

                            <div class="items-center flex w-full flex-row space-x-4">
                                <Label for="filiere" class="text-left w-24">Filière</Label>
                                <div class="w-full">
                                    <SelectionCombo bind:value={bookAddData.filiereId} dataArray={filieres.map((u)=> {
                                        return { value: u.id.toString(), label: u.name } })} displayText="Sélectionner
                                        Filière" noDataText="Aucune Filière trouvée" />
                                </div>
                            </div>

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="title" class="text-left w-24">Thème</Label>
                                <Input id="title" required placeholder="Thème du Mémoire" bind:value={bookAddData.title}
                                    class="" />
                            </div>

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="author" class="text-left w-24">Auteur</Label>
                                <Input id="author" required placeholder="Auteur" bind:value={bookAddData.author}
                                    class="" />
                            </div>
                            <div class="items-center flex flex-row space-x-4">
                                <Label for="overseer" class="text-left w-24">Superviseur</Label>
                                <Input id="overseer" required placeholder="Nom du Superviseur" bind:value={bookAddData.overseerName}
                                    class="" />
                            </div>

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="tags" class="text-left w-24">Mots clés</Label>
                                <Tags bind:tags={bookAddData.tags} maxTags={10} />
                            </div>
                            
                            <div
                                class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                                <div class="w-full flex flex-col  space-y-2">
                                    <div class="w-full">
                                        <SelectionCombo bind:value={bookAddData.pricingModel} dataArray={[{ value: 'Free' ,
                                            label: 'Gratuit' }, { value: 'Paid' , label: "Payant" }]}
                                            displayText="Modèle de Prix" />
                                    </div>
                                </div>
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="price" required type="number" bind:value={bookAddData.price} step={5} min={0}
                                        placeholder="Prix" class="" />
                                </div>
                            </div>

                            <div
                                class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="publish-date" type="number" bind:value={bookAddData.createdAt} step={1} min={1900}
                                        placeholder="Année de Publication" class="" />
                                </div>
                                <div class="w-full flex flex-col space-x-4">
                                    <Input id="pages-count" required bind:value={bookAddData.pageCount} type="number" step={1} min={1}
                                        placeholder="Nbre. Pages" class="" />
                                </div>
                            </div>

                            <div class="items-center flex flex-row space-x-4">
                                <Label for="book-file" class="text-left w-24">Fichier PDF</Label>
                                <input id="book-file" required bind:this={platImageFormField} bind:value={bookAddData.fileName} accept="application/pdf" type="file" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>
                        </form>
                    {:catch error}
                        <div class="text-center flex flex-col">
                            <span>Impossible de Charger les Données nécessairees</span>
                        </div>
                    {/await}
                    <Dialog.Footer>
                        <Button on:click={()=> { addBook(); }} class="bg-teal-800">
                            <div class="flex flex-row content-center items-center justify-center space-x-2">
                                <Icon icon="fluent:save-28-filled" height={20} width={20} />
                                <span>Enregister </span>
                            </div>
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>

        <div class="flex flex-1">

            {#await data.books}
                <Icon icon='eos-icons:loading' class="" />
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
                            <Table.Cell>{book.createdAt.toLocaleDateString("fr")}</Table.Cell>
                            <Table.Cell class="text-right">
                                <div class="flex flex-row space-x-1">
                                    <Button class="bg-sky-500 hover:bg-sky-800">
                                        <Icon icon="mdi:edit"  height={20} width={20}/>
                                    </Button>
                                    <Button on:click={()=> showConfirmationPrompt(book.id)} class="bg-red-500 hover:bg-red-800">
                                        <Icon icon="mdi:delete-outline" height={20} width={20} class="text-white" />
                                    </Button>
                                    <Button on:click={()=> open(`${$page.url.origin}/${book.pdfFile}`, '_blank') } class="bg-slate-400 hover:bg-slate-800">
                                        <Icon icon="mdi:file" height={20} width={20} class="text-white" />
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