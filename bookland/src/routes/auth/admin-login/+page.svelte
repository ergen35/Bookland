<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    let credentials = {
        email: '',
        password: ''
    }
</script>


<div class="w-full bg-teal-50 flex content-center items-center justify-center">
    
    <div class="border border-gray-200 shadow-md rounded-sm h-[400px] w-[600px] shadow-slate-300 py-3 px-5">
        <div class="py-10">
        <div class="text-slate-500 text-center italic text-3xl mb-10">Connexion</div>
            <form method="post">
                <div class="space-y-6">
                    <div class="form-wrapper">
                        <label for="">Adresse e-mail</label>
                        <input type="text" placeholder="Adresse e-mail" bind:value={credentials.email} name="email" class="form-input" id="email">
                    </div>

                    <div class="form-wrapper">
                        <label for="">Mot de passe</label>
                        <input type="password" placeholder="Mot de passe" bind:value={credentials.password} class="form-input" name="password" id="password">
                    </div>

                    <div class="form-wrapper flex flex-row content-center justify-center items-center">
                        <button type="submit" class="bg-teal-800 w-32 text-white p-2 rounded-md hover:scale-110 transition duration-300">Me Connecter</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
