import { describe, expect, it } from 'vitest';
import { AppState } from './appState.svelte';

describe('wahlprüfsteine state management', () => {
	it('initializes without data', () => {
		const testState = new AppState([], [], []);

		expect(testState.questions).to.deep.equal([]);
		expect(
			testState.answersTo({ selectionHandle: 'q1', text: 'question1', number: 1 })
		).to.deep.equal([]);
	});

	it('initializes with single question and answer', () => {
		const testState = new AppState(
			[{ name: 'linke' }],
			[{ selectionHandle: 'q1', text: 'question1' }],
			[{ text: 'answer', byParty: 'linke', toQuestion: 'question1' }]
		);

		expect(testState.questions).to.deep.equal([{ selectionHandle: 'q1', text: 'question1', number: 1 }]);
		expect(
			testState.answersTo({ selectionHandle: 'q1', text: 'question1', number: 1 })
		).to.deep.equal([
			{
				text: 'answer',
				byParty: { name: 'linke' },
				toQuestion: { selectionHandle: 'q1', text: 'question1', number: 1 }
			}
		]);
	});

	it('initializes with multiple questions and answers', () => {
		const testState = new AppState(
			[{ name: 'linke' }],
			[
				{ selectionHandle: 'q1', text: 'question1' },
				{ selectionHandle: 'q2', text: 'question2' }
			],
			[
				{ text: 'answer1', byParty: 'linke', toQuestion: 'question1' },
				{ text: 'answer2', byParty: 'linke', toQuestion: 'question2' }
			]
		);

		expect(testState.questions).to.deep.equal([
			{ selectionHandle: 'q1', text: 'question1', number: 1 },
			{ selectionHandle: 'q2', text: 'question2', number: 2 }
		]);
		expect(
			testState.answersTo({ selectionHandle: 'q1', text: 'question1', number: 1 })
		).to.deep.equal([
			{
				text: 'answer1',
				byParty: { name: 'linke' },
				toQuestion: { selectionHandle: 'q1', text: 'question1', number: 1 }
			}
		]);
	});

	it('changes with selectedQuestion', () => {
		const testState = new AppState(
			[{ name: 'linke' }],
			[
				{ selectionHandle: 'q1', text: 'question1' },
				{ selectionHandle: 'q2', text: 'question2' }
			],
			[
				{ text: 'answer1', byParty: 'linke', toQuestion: 'question1' },
				{ text: 'answer2', byParty: 'linke', toQuestion: 'question2' }
			]
		);

		expect(
			testState.answersTo({ selectionHandle: 'q2', text: 'question2', number: 2 })
		).to.deep.equal([
			{
				text: 'answer2',
				byParty: { name: 'linke' },
				toQuestion: { selectionHandle: 'q2', text: 'question2', number: 2 }
			}
		]);
	});
});
