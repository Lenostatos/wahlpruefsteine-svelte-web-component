import { SvelteMap } from 'svelte/reactivity';
import type { Party, Question } from './appState.svelte';

export class ViewState {
    selectedQuestion?: Question = $state(undefined);
    #questionXUnfoldedParty = new SvelteMap<string, Party>();

    get unfoldedParty(): Party | undefined {
        return this.selectedQuestion
            ? this.#questionXUnfoldedParty.get(this.selectedQuestion.text)
            : undefined;
    }

    set unfoldedParty(party: Party) {
        if (!this.selectedQuestion) {
            throw new Error('Should select a question before unfolding an answer.');
        }
        if (this.unfoldedParty && this.unfoldedParty.name === party.name) {
            this.#questionXUnfoldedParty.delete(this.selectedQuestion?.text);
            return;
        }
        if (!this.unfoldedParty || this.unfoldedParty.name !== party.name) {
            this.#questionXUnfoldedParty.set(this.selectedQuestion?.text, party);
            return;
        }
    }
}

const viewState = new ViewState();
export default viewState;
