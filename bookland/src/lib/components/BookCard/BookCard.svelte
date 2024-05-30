<script lang="ts">
    import type { Book } from "@prisma/client";

    export let book: Book | null = null;
</script>


<div>
  {#if book}
    <div class="py-20">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div class="mb-5">
            <div class="relative bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
              <div class="bg-teal-900 text-white absolute top-2 right-2 p-2 rounded">Gratuit</div>
              <!-- Product image-->
              <img class="w-full" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product Image" />
              <!-- Product details-->
              <div class="p-4 flex-grow">
                <div class="text-center">
                  <!-- Product name-->
                  <h2 class="font-bold">Thème : {book.title}</h2>
                  <h5 class="font-bold">Auteur : {book.author}</h5>
                  <!-- Product price-->
                  <p>Prix : {book.price}</p>
                </div>
              </div>
              <!-- Product actions-->
              <div class="p-4 pt-0 mt-auto border-t border-gray-200 bg-transparent">
                <div class="text-center">
                  <a class="text-gray-800 border border-gray-800 px-4 py-2 rounded hover:bg-green-800 hover:text-white transition" href="#">Télécharger Pdf</a>
                </div>
              </div>
            </div>
          </div>
          <!-- Duplicate this block for more books -->
        </div>
      </div>
    </div>
  {:else}
    <div>Indisponible</div>
  {/if}
</div>
