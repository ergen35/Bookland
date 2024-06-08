<script lang="ts">
    import { onMount } from "svelte";
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import type { PageData } from './$types';
	import ShipCard from '$lib/components/Ship/ShipCard.svelte';
    import { Button }  from "$lib/components/ui/button"
    import calert from "calerts";

    export let data: PageData;
    
    let kkiapaySettings = {
        id: 1,
        publicKey: '',
        secretKey: '',
        privateKey: ''    
    } 

    if(data.appSettings){
        if(data.appSettings.kkiapaySettings){
            kkiapaySettings = { ...data.appSettings.kkiapaySettings }
        }
    }

    async function saveKkiapaySettings(){
        if(canSaveKkiapaySettings){
            
            const response = await fetch('/admin/settings', {
                method: 'POST',
                body: JSON.stringify(kkiapaySettings)
            })

            if(response.ok){
                calert({
                    icon: 'success',
                    title: 'Réglages enregistrés',
                    confirmButton: 'Ok',
                })

            }
            else {
                calert({
                    icon: 'error',
                    title: 'Réglages non enregitrés',
                    confirmButton: 'Ok',
                })
            }
        }
    }

    $: canSaveKkiapaySettings = kkiapaySettings.privateKey && kkiapaySettings.publicKey && kkiapaySettings.secretKey;

</script>

<div class="pt-4 px-5">

    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Réglages</span>
    </div>

    <div>

        <fieldset class="border px-3 py-3">
            <legend class="font-semibold text-lg">
                <ShipCard title="Kkiapay" />
            </legend>

            <div class="flex flex-col space-y-5">

                <div class="items-center flex flex-row space-x-4 w-full">
                    <Label for="public-key" class="text-left w-24">Clé Publique</Label>
                    <Input id="public-key" type="text" required bind:value={kkiapaySettings.publicKey} placeholder="Clé publique" class="col-span-3" />
                </div>

                <div class="items-center flex flex-row space-x-4 w-full">
                    <Label for="private-key" class="text-left w-24">Clé Privée</Label>
                    <Input id="private-key" type="password" required  bind:value={kkiapaySettings.privateKey} placeholder="Clé privée" class="col-span-3" />
                </div>

                <div class="items-center flex flex-row space-x-4 w-full">
                    <Label for="secret-key" class="text-left w-24">Clé Secrète</Label>
                    <Input id="secret-key" type="password" bind:value={kkiapaySettings.secretKey} placeholder="Clé Secrète" class="col-span-3" />
                </div>

                <Button on:click={saveKkiapaySettings} disabled={!canSaveKkiapaySettings} class="w-28 self-end bg-teal-600 hover:bg-teal-800">
                    Enregistrer
                </Button>

            </div>

        </fieldset>

    </div>

</div>