<script lang="ts">
import type {
    Book
} from "@prisma/client";
    import ShipCard from "../Ship/ShipCard.svelte";

export let book: Book | null = null;
</script>

<div>
    {#if book}

    <div class="w-[240px] shadow-sm border-gray-300 bg-stone-300 h-[320px] rounded-sm">
        <div class="w-full h-full flex flex-col">
            <div class="w-full h-2/5 flex">
                <img class="w-[100%] h-full rounded-sm h-auto w-fit" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product Image" />
            </div>
            <div class="flex flex-col">
                <div class="text-center flex flex-col m-1 text-sm">
                    <span class="font-bold text-teal-700">Thème</span> 
                    <span class="border-stone-200 border bg-gray-200 shadow-md rounded-md p-1">{book.title}</span>
                </div>
                <div class="flex flex-row overflow-hidden h-6">
                    <ShipCard title={book.author} />
                </div>
                Book {book.id}
            </div>
        </div>
    </div>
    <!-- <div class="py-20">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div class="mb-5">
            <div class="relative bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
              <div class="bg-teal-900 text-white absolute top-2 right-2 p-2 rounded">Gratuit</div>
              <img class="w-full" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product Image" />
              <div class="p-4 flex-grow">
                <div class="text-center">
                  <h2 class="font-bold">Thème : {book.title}</h2>
                  <h5 class="font-bold">Auteur : {book.author}</h5>
                  <p>Prix : {book.price}</p>
                </div>
              </div>
              <div class="p-4 pt-0 mt-auto border-t border-gray-200 bg-transparent">
                <div class="text-center">
                  <a class="text-gray-800 border border-gray-800 px-4 py-2 rounded hover:bg-green-800 hover:text-white transition" href="#">Télécharger Pdf</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    {:else}
    <div>Indisponible</div>
    {/if}
</div>
