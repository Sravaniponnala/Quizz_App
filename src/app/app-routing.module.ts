import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzComponent } from './quizz/quizz.component';
import { ResultComponent } from './result/result.component';
const routes: Routes = [
  
  { path: 'quizz', component: QuizzComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
