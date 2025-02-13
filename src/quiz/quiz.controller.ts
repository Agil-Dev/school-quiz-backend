import { Controller, Body, Post, HttpStatus, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { IQuestion } from './interfaces/question.interface'
import { IQuiz } from './interfaces/quiz.interface'
import { ITaker } from './interfaces/taker.interface'
import { QuizService } from './quiz.service'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  getQuestions(@Body() key: string): Promise<{ questions: IQuestion[]; id: string } | HttpStatus> {
    return this.quizService.getQuestions(key)
  }

  @Post('/check')
  checkAnswers(@Body() taker: ITaker, quizId: string): Promise<number | HttpStatus> {
    return this.quizService.checkAnswers(taker, quizId)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/create')
  createQuiz(@Body() quiz: IQuiz): Promise<IQuiz> {
    return this.quizService.createQuiz(quiz)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/update')
  updateQuiz(@Body() quiz: IQuiz): Promise<IQuiz | HttpStatus> {
    return this.quizService.updateQuiz(quiz)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/generateKey')
  generateQuizKey(@Body() quizId: string): Promise<string | HttpStatus> {
    return this.quizService.generateQuizKey(quizId)
  }
}
