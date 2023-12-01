// result.component.ts
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../services/quizzservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  questions: any[] = [];
  correctAnswers: any[] = [];

  constructor(public quizzService: QuizzService, private router: Router) {}

  ngOnInit() {
    this.questions = this.quizzService.questions;
    this.correctAnswers = this.quizzService.getCorrectAnswers();
  }

  isAnswerCorrect(index: number): boolean {
    return this.correctAnswers[index];
  }

  getCorrectCount(): number {
    return this.correctAnswers.filter(answer => answer).length;
  }

  getIncorrectCount(): number {
    return this.correctAnswers.filter(answer => !answer).length;
  }

  restartQuiz() {
    this.quizzService.resetQuiz();
    this.router.navigate(['/quizz']);
  }
}
