<script lang="ts">
    import type { LayoutData } from './$types';
    import '../app.css'
    import Icon from '@iconify/svelte'

    export let data: LayoutData;
</script>


<div class="w-screen h-screen">
    <div class="flex flex-col h-full">
        
        <!-- Navigation bar -->
        <div class="w-full flex h-auto bg-teal-700 py-2 px-3">
            <div class="flex flex-row w-full">
                <a href="/" class="italic text-3xl text-gray-100">Bookland</a>

                <div class="flex flex-1">
                    <div class="w-full justify-end items-center flex flex-row space-x-3 px-2">
                        <a class="navbar-item" href="/all-categories">Catégories</a>
                        <a class="navbar-item" href="/all">Mémoires</a>

                        {#if data.session && data.session.user.userId == 'basic'}
                        <a class="" href="/account">Mon Compte</a>
                        {:else}
                        <a href="/auth/login"
                            class="text-gray-200 border-white border px-2 py-1 rounded-sm hover:bg-white hover:text-teal-900 hover:transition-colors ease-in-out transition-colors duration-500">
                            <span class="flex flex-row space-x-1 items-center content-center">
                                <Icon icon="ant-design:login-outlined" class="" />
                                <span>Connexion</span>
                            </span>
                        </a>
                        {/if}

                    </div>
                </div>
            </div>
        </div>

        <main class="flex flex-1">
            <slot />
        </main>


        <footer class="flex bg-gray-700">
            <div class="text-center w-full">
                <span class="text-gray-50"><a href="/">Bookland</a> &copy; Tous droits réservés</span>
            </div>
        </footer>

    </div>

</div>