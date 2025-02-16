export class QuestionList {
    sections:Section[] | Section[] = [];
}

export class Section {
    name!:string;
    questions: Question[] | Question[] = [];
    selected:boolean | boolean = false;
}

export class Question {
    name!:string;
    prompt!:string;
    answers:Answer[] | Answer[] = [];
}

export class Answer {
    prompt!:string;
    selected!:boolean;
    correct:boolean | boolean = false;
}