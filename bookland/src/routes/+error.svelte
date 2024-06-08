<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
</script>

<div class="w-full flex flex-row h-full">
    <center class="items-center content-center justify-center w-full flex flex-col space-y-3">
        <div class="text-xl text-center">{$page.status}: {$page.error?.message}</div>

        <div class="text-center">
            <a href="/auth/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                connexion
            </a>
        </div>
        <div>Ou</div>
        <div class="text-center">
            <a href="/books" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex flex-row space-x-3">
                <Icon height={20} width={20} color="white" icon="majesticons:home" class="text-slate-500 h-6 w-6" />
                <span>Retour à l'acceuil</span>
            </a>
        </div>
    </center>

</div>