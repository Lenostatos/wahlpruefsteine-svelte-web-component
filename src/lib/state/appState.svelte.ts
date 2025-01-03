import { validateAnswers } from './validateInput';

export type Party = { name: string };
export type Question = { text: string; selectionHandle: string; number: number };
export type QuestionData = { text: string; selectionHandle: string };
export type Answer = { text: string; byParty: Party; toQuestion: Question };
export type AnswerData = { text: string; byParty: string; toQuestion: string };

export class AppState {
    #parties: Array<Party> = [];
    #questions: Array<Question> = [];
    #answers: Array<Answer> = [];

    #questionXAnswers: Array<{ question: Question; answers: Array<Answer> }> = [];

    constructor(
        parties: Array<Party>,
        questions: Array<QuestionData>,
        answerData: Array<AnswerData>
    ) {
        this.#parties = parties;
        this.#questions = questions.map((q, i) => {
            return { number: i + 1, ...q };
        });

        this.#answers = validateAnswers(parties, this.#questions, answerData);

        for (const question of this.#questions) {
            const answers: Array<Answer> = [];

            for (const party of this.#parties) {
                const answer = this.#answers.find((a) => a.toQuestion === question && a.byParty === party);

                if (answer) {
                    answers.push({
                        text: answer.text,
                        byParty: party,
                        toQuestion: answer.toQuestion
                    });
                }
            }
            this.#questionXAnswers.push({ question, answers });
        }
    }

    get questions() {
        return this.#questions;
    }

    answersTo(question: Question) {
        const answers = this.#questionXAnswers.find((qXa) => qXa.question.text === question.text);
        return answers ? answers.answers : [];
    }
}
