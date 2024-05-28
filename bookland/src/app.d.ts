// See https://kit.svelte.dev/docs/types#app

import type { SessionInfos } from "$lib/models";
import { PageData } from '../.svelte-kit/types/src/routes/auth/login/$types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: SessionInfos | null,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
