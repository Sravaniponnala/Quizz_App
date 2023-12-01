// quizz.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzService } from '../services/quizzservices.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  questions: any[] = [];//store quizz questions
  currentQuestion: any;//store current questions
  form!: FormGroup;//to handle user selections
 selectedOption: any;//to store user selection options
  currentQuestionIndex: number = 0;//index of current questions
  hasAnsweredCurrentQuestion: boolean = false;//track if the user has answered the current question

  constructor(
    public quizzService: QuizzService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('QuizzComponent initialized');

    this.form = this.fb.group({
      selectedOption: [''], 
    });
    //to fetch the questions from quizz services when component is initiated
    this.quizzService.getQuestions().subscribe(
      (questions) => {
        //here it storing the result data in this.questions var
        this.questions = questions;
        //for loading the question
        this.loadQuestion();
      },
      (error:any)=>
      {
        console.log("Questions are not fetched");
      }
    );
  }

  loadQuestion() {
    //fetching the curretn question from quizz services  and assign to the current question var
    this.currentQuestion = this.quizzService.getCurrentQuestion(this.currentQuestionIndex);
    this.hasAnsweredCurrentQuestion ? this.form.disable() : this.form.enable();
   
  }

  selectOption(option: any) {
    this.selectedOption = option;
  }

  goToNext() {
      if (this.currentQuestionIndex < this.questions.length) 
      {
      this.quizzService.recordUserAnswer(this.currentQuestionIndex, this.selectedOption);
      this.currentQuestionIndex++;
      this.loadQuestion();
    } 
    }
  
  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

submit() {
    this.quizzService.recordUserAnswer(this.currentQuestionIndex, this.selectedOption);
    if (this.isLastQuestion)
     {
          // Set result data in the service
          this.quizzService.setResultData
          ({
            
            correctAnswers: this.quizzService.getCorrectAnswers(),
          });
          console.log('Navigating to the result page');
          this.router.navigate(['result']);
     } 
  
}

restartQuiz() {
  this.quizzService.resetQuiz();
  this.currentQuestionIndex = 0;
  this.hasAnsweredCurrentQuestion = false;
  this.loadQuestion();
}


}
