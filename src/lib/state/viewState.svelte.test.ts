import { describe, expect, it } from 'vitest';
import { ViewState } from './viewState.svelte';

describe('view state', () => {
	it('works', () => {
		const viewState = new ViewState();

		expect(viewState.unfoldedParty).to.equal(undefined);

		viewState.selectedQuestion = { number: 1, selectionHandle: 'q1', text: 'question1' };

		expect(viewState.unfoldedParty).to.equal(undefined);

		viewState.unfoldedParty = { name: 'party1' };

		expect(viewState.unfoldedParty).to.deep.equal({ name: 'party1' });

		viewState.unfoldedParty = { name: 'party1' };

		console.log(viewState.unfoldedParty && viewState.unfoldedParty.name === 'party1');
		console.log(viewState.selectedQuestion.text);

		expect(viewState.unfoldedParty).to.equal(undefined);

		viewState.unfoldedParty = { name: 'party1' };

		expect(viewState.unfoldedParty).to.deep.equal({ name: 'party1' });

		viewState.unfoldedParty = { name: 'party2' };

		expect(viewState.unfoldedParty).to.deep.equal({ name: 'party2' });
	});
});
