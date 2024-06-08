<script lang="ts">
    import type { PageData } from './$types';
    import * as Alert from "$lib/components/ui/alert/index.js";
    import Icon from '@iconify/svelte';
    
    export let data: PageData;
</script>


<div class="pt-8 px-5 flex flex-row justify-center content-center items-center">

    {#if data.book}
        <div>
            <kkiapay-widget 
            key="33cfa930242211efa9251f24b794956e"
            amount="{data.book.price}"
            position="center"
            sandbox={true}
            email="{data.session?.email}"
            name="{data.session?.name}"
            data=""
            callback="">
        </kkiapay-widget>
    </div>
    {:else}

    <Alert.Root>
        <Icon icon="ion:information-circle" color="red" class="mx-2 w-3.5 h-3.5"   />
        <Alert.Title>Erreur</Alert.Title>
        <Alert.Description>
            Livre Introuvable
        </Alert.Description>
    </Alert.Root>

    {/if}
</div>