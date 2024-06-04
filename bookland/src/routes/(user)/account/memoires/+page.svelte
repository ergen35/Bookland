<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Icon from "@iconify/svelte";
    import type { PageData } from '../../mesMemoires/$types';
    
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

    let isDialogOpened = false;

    
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
        createdAt: ''
    }
}
}

async function addBook() {

const response = await fetch('/admin/manage-books', {
    method: 'POST',
    body: JSON.stringify(bookAddData)
})

if (response.ok) {
    
    isDialogOpened = false;
}

}

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
                        <Icon icon="" height={20} width={20} />
                        <span> Ajouter </span>
                    </div>
                </Dialog.Trigger>
            </Dialog.Root>
        </div>
    </div>
</div>