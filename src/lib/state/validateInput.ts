import type { Party, Question, AnswerData, Answer, QuestionData } from './appState.svelte';

export function validateAnswers(
    parties: Array<Party>,
    questions: Array<QuestionData>,
    answerData: Array<AnswerData>
): Array<Answer> {
    //TODO use zod for (basic) validation and data import
    const referencePartyNames = parties.map((p) => p.name);
    const referenceQuestionTexts = questions.map((q) => q.text);

    const partyQuestionCombos: Array<{ party: string; question: string }> = [];

    for (const answer of answerData) {
        if (!referencePartyNames.includes(answer.byParty)) {
            console.error('Invalid party name in answer data:', answer.byParty);
            throw new Error('Should only use reference party names in answer data.');
        }

        if (!referenceQuestionTexts.includes(answer.toQuestion)) {
            console.error('Invalid question text in answer data:', answer.toQuestion);
            throw new Error('Should only use reference question texts in answer data.');
        }

        if (
            partyQuestionCombos.find(
                (combo) => answer.byParty === combo.party && answer.toQuestion === combo.question
            )
        ) {
            console.error(
                'Duplicate party-question combo found in answer data.',
                answer.byParty,
                answer.toQuestion
            );
            throw new Error(
                'Should only have one answer per combination of party and question in answer data.'
            );
        }

        partyQuestionCombos.push({ party: answer.byParty, question: answer.toQuestion });
    }

    return answerData.map((a) => {
        return {
            text: a.text,
            byParty: parties.find((p) => p.name === a.byParty) as Party,
            toQuestion: questions.find((q) => q.text === a.toQuestion) as Question
        };
    });
}
