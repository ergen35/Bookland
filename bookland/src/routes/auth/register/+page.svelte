<script lang="ts">
    import { stringify } from 'postcss';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let credentials = {
        fullname: '',
        email: '',
        password: ''
    }
</script>


<div class="w-full bg-teal-50 flex content-center items-center justify-center">
    
    <div class="border border-gray-200 shadow-md rounded-sm h-auto w-auto shadow-slate-300 py-3 px-5">
        <div class="py-10">
        <div class="text-slate-500 text-center italic text-3xl mb-10">Inscription</div>
            
            <form method="post">
                <div class="space-y-6">
                   <div class="flex flex-row content-between space-x-5">

                        <div class="form-wrapper">
                            <label for="fullname" class="mb-1 ms-1">Nom & Prénoms</label>
                            <input type="text" placeholder="Nom & Prénoms" bind:value={credentials.fullname} name="fullname" class="form-input" id="fullname">
                        </div>

                        <div class="form-wrapper">
                            <label for="email" class="mb-1 ms-1">Adresse e-mail</label>
                            <input type="text" placeholder="Adresse e-mail" bind:value={credentials.email} name="email" class="form-input" id="email">
                        </div>
                   </div>

                    <div class="form-wrapper">
                        <label for="password" class="mb-1 ms-1">Mot de passe</label>
                        <input type="password" placeholder="Mot de passe" bind:value={credentials.password} class="form-input" name="password" id="password">
                    </div>

                    <!-- <div class="form-wrapper">
                        <label for="password" class="mb-1 ms-1">Confirmer le mot de passe</label>
                        <input type="password" placeholder="Confirmer Mot de passe" bind:value={credentials.password} class="form-input" name="password" id="password">
                    </div> -->

                    <div class="form-wrapper flex flex-row content-center justify-center items-center">
                        <button type="submit" class="bg-teal-800 w-32 text-white p-2 rounded-md hover:scale-110 transition duration-300">M'inscrire</button>
                    </div>
                </div>
            </form>

            <div class="text-center mt-7">
                <span>
                    J'ai déja un compte ? <a href="/auth/login" class="italic text-blue-600 underline font-bold">Connexion</a>
                </span>
            </div>
        </div>
    </div>
</div>
