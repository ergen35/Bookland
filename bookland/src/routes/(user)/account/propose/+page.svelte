<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import * as Alert from "$lib/components/ui/alert/index.js";
    
    export let data: PageData;
</script>

<div class="pt-4 px-5">
    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Mes Mémoires</span>
    </div>

    <div class="flex flex-row space-x-3">
        
        <span class="text-slate-600 text-xl">
            
        </span>
    </div>

    <div>
        <Alert.Root>
            <Icon icon="twemoji:warning" color="orange" class="mx-2 w-3.5 h-3.5"   />
            <Alert.Title>Notification</Alert.Title>
            <Alert.Description>
                Les propositions de mémoires sont désactivés pour le moment, revenez plus tard
            </Alert.Description>
          </Alert.Root>
    </div>
    
</div>