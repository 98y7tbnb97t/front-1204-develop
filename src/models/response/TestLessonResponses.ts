import { IHomework } from "../IHomwork";
import { ITestLesson } from "../ITestLesson";

export interface IgetTestLesson {
    group: ITestLesson;
}

export interface IgetTestLessonHistory {
    testLesson: ITestLesson;
    homework: IHomework;
}