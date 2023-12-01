import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators'; // Importing a tool for extra tasks when dealing with data

@Injectable({
  providedIn: 'root',
})
export class QuizzService { 

  private _questions!: any[]; // used to store  quiz questions
  private currentQuestionIndex = 0; //used to store the index of current question
  private userSelections: string[] = []; // used to store the user selection options
  correctAnswers: boolean[] = []; // A list to check if the user got each question right/wrong 

  constructor(private http: HttpClient) {} 

  private resultData: any = null; // A place to store some result information

  setResultData(data: any): void { // A way to save result information
    this.resultData = data;
  }

  getResultData(): any { // A way to get the result data
    return this.resultData;

  }

  getCorrectAnswers(): any[] { // A way to get the list of correct answers
    return this.correctAnswers;
  }

  get questions(): any[] { // A way to get the list of quiz questions
    return this._questions;
  }

  getQuestions(): Observable<any[]> { // A way to fetch questions from json file
    return this.http.get<any[]>('assets/questions.json').pipe(
      tap((questions) => { // Doing some extra tasks when we get the questions
        this._questions = questions;
        this.correctAnswers = questions.map(
          (question: any) => {
          const correctOptionIndex = question.options.indexOf(question.correctAnswer);
          return correctOptionIndex === 0;
        });
      })
    );
  }

  getCurrentQuestion(index: number): any { // A way to get the current question by its position
    return this.questions[index];
  }

  resetQuiz() { // A way to start the quiz over
    this.currentQuestionIndex = 0;
    this.correctAnswers = [];
  }

  recordUserAnswer(index: number, selectedOption: string): void { // A way to remember what the user chose for a question

    const question = this.getCurrentQuestion(index);//it used to fetch question along with id and assigned to question var
    if (question) {
      const isCorrect=selectedOption===question.correctAnswer
  
      this.userSelections[index] = selectedOption;
      this.correctAnswers[index] = isCorrect;
    }
    
  }

  recordUserAnswers(): void { // A way to remember and show all user answers
    console.log('Recording user answers:');
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.getCurrentQuestion(i);
      const selectedOption = this.userSelections[i];
      const isCorrect = selectedOption === question.correctAnswer;
    }
    this.userSelections = [];
    this.correctAnswers = [];
  }

}
